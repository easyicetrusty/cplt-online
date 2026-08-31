/* Fictional demonstration content. Behaviour modelled on the production
   pipeline: page-type routing, garble detection, page-anchored output. */
const GARBLE = [
"## Figure 4.1 — 引 囙 Architecture 割 Overview",
"",
"Syst<math>\\subset</math>m Bound<sub>a</sub>ry  囙  DMZ  引",
"App 割 Tier  →  <math>\\rightarrow</math>  D<sup>a</sup>ta Tier 囙",
"引 Ext<math>\\subset</math>rnal  Int<sub>e</sub>rface  割  TLS 1.2 囙 引",
"Bast<sub>i</sub>on  引  MFA 囙  <math>\\subset</math>  Prod Subnet",
"割 Backup  Zone  引  AZ-2  <sup>e</sup>ncrypt<sub>e</sub>d? 囙",
"引 囙 割 引 囙 <math>\\subset</math> 割 引 囙 割 引 囙 割 引 囙",
"Data Class<sub>i</sub>fication  引  RESTRICT<sup>E</sup>D 囙 割",
"引 Interface  ID  囙  IF-0<sub>4</sub>7  割  引 囙 割 引"
];
const CLEAN = [
"### Figure 4.1 — Architecture Overview  [VISION-EXTRACTED DIAGRAM]",
"",
"**System boundary:** production VPC, single region",
"**Inside the boundary:** application tier, data tier, bastion host",
"**Outside the boundary:** corporate directory, partner SFTP endpoint",
"",
"**Flows**",
"  corporate directory → bastion → application tier   (TLS 1.2, MFA)",
"  application tier → data tier                        (mTLS, port 5432)",
"  data tier → backup zone, AZ-2                       (method NOT STATED)",
"",
"**Data classification marked on diagram:** RESTRICTED",
"**Interface identifiers:** IF-047 (partner SFTP), IF-051 (directory sync)",
"",
"> Source: page 72. Backup-zone encryption method absent from the figure",
"> and from the surrounding narrative — recorded as an evidence gap, not",
"> as an absence claim."
];
