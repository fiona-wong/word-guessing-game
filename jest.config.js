module.exports = {
    setupFilesAfterEnv: ["./enzyme.setup.js"],
    transform: {
        "^.+\\.js?$": "babel-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|sass)$": "identity-obj-proxy"
    }
};
