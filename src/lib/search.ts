import type { Tool } from "../tools/registry";

export type SearchResult = {
  tool: Tool;
  score: number;
  matchedBy: "name" | "keyword" | "alias" | "intent" | "category" | "description" | "fuzzy" | "recent";
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function containsFuzzy(haystack: string, query: string) {
  const parts = query.split(" ").filter(Boolean);
  return parts.length > 0 && parts.every((part) => haystack.includes(part) || [...part].every((char) => haystack.includes(char)));
}

export function searchTools(query: string, tools: Tool[], recentIds: string[] = []): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  return tools
    .map((tool) => {
      const name = normalize(tool.name);
      const category = normalize(tool.category);
      const description = normalize(tool.description);
      let score = 0;
      let matchedBy: SearchResult["matchedBy"] = "fuzzy";

      if (name === q) {
        score += 100;
        matchedBy = "name";
      } else if (name.startsWith(q)) {
        score += 80;
        matchedBy = "name";
      }

      if (tool.keywords.some((keyword) => normalize(keyword) === q || normalize(keyword).includes(q))) {
        score += 75;
        matchedBy = "keyword";
      }
      if (tool.aliases.some((alias) => normalize(alias) === q || normalize(alias).includes(q))) {
        score += 70;
        matchedBy = "alias";
      }
      if (tool.intents.some((intent) => normalize(intent) === q || normalize(intent).includes(q) || q.includes(normalize(intent)))) {
        score += 65;
        matchedBy = "intent";
      }
      if (category.includes(q)) {
        score += 40;
        matchedBy = "category";
      }
      if (description.includes(q)) {
        score += 25;
        matchedBy = "description";
      }
      if (score === 0 && containsFuzzy(`${name} ${description} ${tool.keywords.join(" ")}`, q)) {
        score += 10;
        matchedBy = "fuzzy";
      }
      if (tool.popular && score > 0) score += 5;
      if (recentIds.includes(tool.id) && score > 0) {
        score += 5;
        matchedBy = "recent";
      }

      return { tool, score, matchedBy };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, 8);
}
