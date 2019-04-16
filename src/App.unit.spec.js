import App from "./App";
import React from "react";
import { mount } from "enzyme";
import * as api from "./api";

describe("App", () => {
    it("should render correctly", () => {
        const wrapper = mount(<App />);
        const fetch = jest.fn(() => new Promise((resolve) => resolve()));
        api.getWordsApi = jest.fn().mockResolvedValue(["hi", "bye", "cya"]);
        expect(wrapper.exists(".app")).toBe(true);
    });
});
