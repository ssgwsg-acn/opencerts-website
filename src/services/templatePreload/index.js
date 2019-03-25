import { certificateData } from "@govtechsg/open-certificate";
import { get } from "lodash";
import templates from "../../components/CertificateTemplates";

export const preloadTemplates = certificate => {
  const rawCert = certificateData(certificate);
  const selectedTemplateName = get(rawCert, "$template", "default");
  const selectedTemplate = templates[selectedTemplateName] || templates.default;
  selectedTemplate.preload();
  return selectedTemplate;
};
