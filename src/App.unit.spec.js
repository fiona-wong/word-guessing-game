import App from "./App";
import React from "react";
import { mount } from "enzyme";

describe("App", () => {
    it("should render correctly", () => {
        const wrapper = mount(<App />);
        expect(wrapper.exists(".app")).toBe(true);
    });
});
