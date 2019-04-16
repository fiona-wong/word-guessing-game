import App from "./App";
import React from "react";
import { mount } from "enzyme";
import * as api from "./api";

import InteractiveSection from "./components/InteractiveSection";
import WordShown from "./components/WordShown";
import WrongLettersGuessed from "./components/WrongLettersGuessed";
import GuessesLeft from "./components/GuessesLeft";
import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";

describe("App", () => {
    it("should render correctly", () => {
        const wrapper = mount(<App />);
        api.getWordsApi = jest.fn().mockResolvedValue(["hi", "bye", "cya"]);

        expect(wrapper.find(InteractiveSection).exists()).toBe(true);
        expect(wrapper.find(WordShown).exists()).toBe(true);
        expect(wrapper.find(WrongLettersGuessed).exists()).toBe(true);
        expect(wrapper.find(GuessesLeft).exists()).toBe(true);
        expect(wrapper.find(Modal).exists()).toBe(false);
    });
    it("should render modal when showResetModal is true", () => {
        const wrapper = mount(<App />);
        api.getWordsApi = jest.fn().mockResolvedValue(["hi", "bye", "cya"]);
        wrapper.setState({
            showResetModal: true
        });
        expect(wrapper.find(Modal).exists()).toBe(true);
    });
    it("should not render loading spinner when isLoading is false", () => {
        const wrapper = mount(<App />);
        api.getWordsApi = jest.fn().mockResolvedValue(["hi", "bye", "cya"]);
        wrapper.setState({
            isLoading: false
        });
        expect(wrapper.find(LoadingSpinner).exists()).toBe(false);
    });
});
