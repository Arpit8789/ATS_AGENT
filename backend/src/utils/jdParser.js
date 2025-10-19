// Parses Job Description for keywords (DSA style: Set, freq map, etc.)
exports.extractKeywords = (jobDescription) => {
    const raw = jobDescription.replace(/[\n,.]/g, ' ').toLowerCase();
    const words = raw.split(/\s+/).filter(Boolean);
    const ignoreWords = new Set([
        'the', 'and', 'with', 'for', 'this', 'that', 'you', 'your', 'are', 'will', // stopwords
    ]);
    const keywordFreq = new Map();
    words.forEach(w => {
        if (!ignoreWords.has(w) && w.length > 2) {
            keywordFreq.set(w, (keywordFreq.get(w) || 0) + 1);
        }
    });
    return Array.from(keywordFreq.keys());
};
