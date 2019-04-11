const _buildWordObject = (wordsObject, word, index) => {
    wordsObject[index] = word;
    return wordsObject;
};

export const transformFromApi = (wordList) =>
    wordList.reduce(_buildWordObject, {});
