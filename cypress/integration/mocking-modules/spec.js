import React from "react";
import { mount } from "cypress-react-unit-tests";
import Contact from './contact'
import MockedMap from "./map"

it("should render contact information", () => {
  // TODO might be nice to be able to selectively mock components
  // like "./map"
  // similar to jest.mock("./map", fakeComponent)

  const center = { lat: 0, long: 0 };
    mount(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />
    );
})
