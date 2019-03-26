import { put, call } from "redux-saga/effects";
import { get } from "lodash";
import { certificateData } from "@govtechsg/open-certificate";
import templates from "../components/CertificateTemplates";
import json from "../../tests_fixture/NP_Certs_FT_BMS.json";
import { preloadTemplateChunk } from "./templates";
import { types as templateActions } from "../reducers/templates";

describe("preload template", () => {
  it("should fetch the template name", () => {
    expect(get(certificateData(json), "$template", "default")).toEqual(
      "NP-AA2018-BMS(CLT)"
    );
  });

  const loadingTemplate = "NP-AA2018-BMS(CLT)";

  const saga = preloadTemplateChunk({ payload: json });

  it("should prefetch the template chunk", () => {
    expect(saga.next().value).toEqual(
      put({
        type: templateActions.PRELOAD_TEMPLATE_CHUNK,
        payload: loadingTemplate
      })
    );

    expect(saga.next().value).toEqual(call(templates[loadingTemplate].preload));

    expect(saga.next().value).toEqual(
      put({
        type: templateActions.TEMPLATE_CHUNK_LOADED
      })
    );
  });
});
