export interface AnswerBlueprint {
  mark2: {
    definition: string;
    keyPoints: string[];
    clinicalPearls: string;
  };
  mark5: {
    heading: string;
    introduction: string;
    etiologyOrPathology: string;
    clinicalFeatures: string[];
    investigations: string[];
    treatmentSummary: string;
    diagramSuggestion: string;
  };
  mark10: {
    goldStandardTitle: string;
    introAndDefinition: string;
    classificationOrAnatomy: string[];
    pathophysiologySteps: string[];
    clinicalManifestations: string[];
    diagnosticWorkup: {
      goldStandard: string;
      routineLabs: string[];
      imaging: string[];
    };
    stagingOrScoring: string;
    comprehensiveManagement: {
      emergency: string;
      medicalTherapy: string[];
      surgicalOrDefinitive: string[];
    };
    complications: string[];
    topperFlowchart: string;
    diagramChecklist: string[];
  };
  mnemonic: {
    title: string;
    letters: { letter: string; description: string }[];
    explanation: string;
  };
}

export interface TopicItem {
  id: string;
  title: string;
  subject: string;
  year: '1' | '2' | '3' | '4';
  frequency: 'Repeated 5+ Years' | 'Most Frequent' | 'Gold Medal Topic' | 'Clinical Vignette';
  examWeight: '10-Mark Essay' | '5-Mark Short Essay' | '2-Mark Short Note';
  diagramType?: string;
  answers: AnswerBlueprint;
}

export interface SubjectItem {
  id: string;
  name: string;
  code: string;
  paperTitle: string;
  qSize: string;
  aSize: string;
  examDuration: string;
  totalMarks: number;
  topics: TopicItem[];
}

export interface CurriculumYear {
  id: '1' | '2' | '3' | '4';
  name: string;
  phase: string;
  duration: string;
  subjects: SubjectItem[];
}

export interface QuizQuestion {
  id: string;
  subject: string;
  year: '1' | '2' | '3' | '4';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  highYieldTip: string;
}

export const CURRICULUM_DATA: Record<string, CurriculumYear> = {
  '1': {
    id: '1',
    name: '1st Year MBBS',
    phase: 'Pre-Clinical Phase',
    duration: '12 Months (Foundation & Basic Sciences)',
    subjects: [
      {
        id: 'anat-101',
        name: 'Human Anatomy',
        code: 'ANAT-I',
        paperTitle: 'Gross Anatomy, Embryology, Histology & Neuroanatomy',
        qSize: '4.8 MB',
        aSize: '3.6 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'anat-bp',
            title: 'Brachial Plexus - Formation, Branches & Erb-Duchenne Palsy',
            subject: 'Human Anatomy',
            year: '1',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            diagramType: 'brachial-plexus',
            answers: {
              mark2: {
                definition: "Erb's Palsy is an upper brachial plexus injury caused by traction injury to the C5-C6 nerve roots at Erb's Point (meeting of 6 nerve roots).",
                keyPoints: [
                  "Deformity: Policeman's tip / Waiter's tip hand (adducted, internally rotated arm, extended elbow, pronated forearm).",
                  "Common etiologies: Difficult breech delivery (shoulder dystocia) or fall on shoulder with lateral neck flexion."
                ],
                clinicalPearls: "Muscles paralyzed include Supraspinatus, Infraspinatus, Deltoid, Biceps brachii, and Brachioradialis."
              },
              mark5: {
                heading: "Formation & Branches of Brachial Plexus",
                introduction: "Formed by the anterior (ventral) rami of C5 to T1 spinal nerves, supplemented occasionally by C4 (pre-fixed) or T2 (post-fixed).",
                etiologyOrPathology: "Divided into Roots (5), Trunks (Upper C5-C6, Middle C7, Lower C8-T1), Divisions (Anterior & Posterior), and Cords (Lateral, Posterior, Medial) named relative to the axillary artery.",
                clinicalFeatures: [
                  "Lateral Cord (C5-C7): Musculocutaneous nerve, lateral root of median nerve, lateral pectoral nerve.",
                  "Medial Cord (C8-T1): Ulnar nerve, medial root of median nerve, medial pectoral, medial cutaneous nerves of arm & forearm.",
                  "Posterior Cord (C5-T1): Radial nerve, Axillary nerve, Thoracodorsal, Upper & Lower Subscapular nerves."
                ],
                investigations: ["EMG & Nerve Conduction Studies", "High-Resolution MRI of brachial plexus"],
                treatmentSummary: "Conservative physiotherapy initially; surgical nerve grafting/neurotization if no spontaneous recovery by 3-6 months.",
                diagramSuggestion: "Draw root-to-cord branching tree showing 5 roots, 3 trunks, 6 divisions, 3 cords, and terminal nerves."
              },
              mark10: {
                goldStandardTitle: "Brachial Plexus: Detailed Anatomy, Cord Branches & Erb-Duchenne vs Klumpke's Palsy",
                introAndDefinition: "The brachial plexus is the somatic nerve network supplying motor innervation to the upper limb and cutaneous sensation. Originates in the posterior triangle of the neck and courses through the axilla.",
                classificationOrAnatomy: [
                  "Roots: Ventral rami of C5, C6, C7, C8, T1.",
                  "Trunks: Superior (C5+C6), Middle (C7), Inferior (C8+T1).",
                  "Divisions: Each trunk splits into Anterior (flexor compartment) and Posterior (extensor compartment).",
                  "Cords: Lateral (Anterior C5-C7), Medial (Anterior C8-T1), Posterior (All 3 Posterior divisions C5-T1).",
                  "Erb's Point: Junction where C5 and C6 unite, giving off nerve to subclavius and suprascapular nerve."
                ],
                pathophysiologySteps: [
                  "Forced increase in angle between head and shoulder -> Excessive traction on C5-C6 nerve roots.",
                  "Neurapraxia / axonotmesis of Suprascapular, Musculocutaneous, and Axillary nerves.",
                  "Loss of abduction (Deltoid/Supraspinatus), loss of lateral rotation (Infraspinatus/Teres minor), loss of flexion & supination (Biceps brachii)."
                ],
                clinicalManifestations: [
                  "Arm hangs by side in adduction and medial rotation.",
                  "Forearm is extended and pronated ('Porter's tip' or 'Policeman's tip' posture).",
                  "Loss of sensation over lateral aspect of upper arm (regimental badge area / Deltoid skin).",
                  "Biceps and supinator jerks are absent."
                ],
                diagnosticWorkup: {
                  goldStandard: "Electrodiagnostic studies (Electromyography/NCS) at 3-4 weeks post-injury",
                  routineLabs: ["Baseline CBC", "X-ray clavicle and cervical spine to rule out fractures"],
                  imaging: ["MRI neurography of brachial plexus to identify pseudomeningoceles / root avulsion"]
                },
                stagingOrScoring: "Narakas Classification for Obstetrical Brachial Plexus Palsy (Grades I to IV).",
                comprehensiveManagement: {
                  emergency: "Gentle handling, avoid traction on the flail limb; maintain passive range of motion to prevent joint contractures.",
                  medicalTherapy: ["Daily passive physical therapy", "Dynamic cock-up splints"],
                  surgicalOrDefinitive: [
                    "Indications: Failure of biceps recovery by 3 to 6 months of life.",
                    "Procedures: Micro-neural reconstruction, sural nerve autografting, Oberlin nerve transfer (ulnar fascicle to motor branch of biceps)."
                  ]
                },
                complications: ["Permanent joint contractures", "Glenohumeral dysplasia", "Limb length discrepancy"],
                topperFlowchart: "Roots (C5-T1) -> Trunks (Upper/Mid/Lower) -> Divisions (Ant/Post) -> Cords (Lat/Med/Post) -> Terminal Nerves",
                diagramChecklist: [
                  "Roots labeled with spinal segment levels",
                  "Erb's point clearly marked with its 6 radiating nerve branches",
                  "Relationship to 1st, 2nd, and 3rd parts of the Axillary Artery",
                  "Color coded roots: Blue for motor, Red for cord relations"
                ]
              },
              mnemonic: {
                title: "Remember the 5 Functional Segments",
                letters: [
                  { letter: "R", description: "Roots (Drink)" },
                  { letter: "T", description: "Trunks (Cold)" },
                  { letter: "D", description: "Divisions (Beer)" },
                  { letter: "C", description: "Cords (Pour)" },
                  { letter: "B", description: "Branches (Shots)" }
                ],
                explanation: "'Read The Damn Cart Carefully, Boys' or 'Remember To Drink Cold Beer'."
              }
            }
          },
          {
            id: 'anat-stomach',
            title: 'Stomach - Blood Supply, Lymphatic Drainage & Relations',
            subject: 'Human Anatomy',
            year: '1',
            frequency: 'Most Frequent',
            examWeight: '10-Mark Essay',
            diagramType: 'stomach-bed',
            answers: {
              mark2: {
                definition: "Stomach is a J-shaped muscular reservoir situated in the epigastric, umbilical, and left hypochondriac regions of the abdomen.",
                keyPoints: [
                  "Two orifices: Cardiac (T11) and Pyloric (L1 / transpyloric plane).",
                  "Blood supply from Celiac Trunk (Left Gastric, Splenic, Common Hepatic branches)."
                ],
                clinicalPearls: "Troisier sign (Virchow's node enlargement in left supraclavicular fossa) indicates gastric carcinoma metastasis via thoracic duct."
              },
              mark5: {
                heading: "Lymphatic Drainage of Stomach & Gastric Cancer Spread",
                introduction: "Gastric lymphatics follow the arterial supply closely and drain primarily into celiac lymph nodes.",
                etiologyOrPathology: "Divided into 4 quadrants: Pancreaticosplenic (Area I - fundus/upper body), Left gastric (Area II - lesser curvature), Right gastroepiploic (Area III - pyloric lower greater curvature), and Pyloric/Hepatic (Area IV - pylorus).",
                clinicalFeatures: [
                  "Early satiety, persistent epigastric pain, weight loss, coffee-ground vomitus in malignancies."
                ],
                investigations: ["Upper GI Endoscopy with biopsy", "CECT Abdomen & Pelvis"],
                treatmentSummary: "Subtotal or total gastrectomy with D2 lymphadenectomy according to Japanese gastric cancer guidelines.",
                diagramSuggestion: "Draw J-shaped stomach contour, divide into 4 zones, and mark lymphatic stations 1 through 16."
              },
              mark10: {
                goldStandardTitle: "Stomach: Gross Anatomy, Peritoneal Relations, Blood Supply & Bed of Stomach",
                introAndDefinition: "The stomach connects the abdominal esophagus to the duodenum. Crucial for mechanical digestion, acid-peptic secretion, and intrinsic factor production.",
                classificationOrAnatomy: [
                  "Subdivisions: Cardiac part, Fundus (above horizontal line through cardiac notch), Body, and Pyloric part (Antrum and Canal).",
                  "Curvatures: Lesser (contains incisura angularis) and Greater (gives attachment to greater omentum).",
                  "Stomach Bed structures: Pancreas body/tail, Splenic artery, Left kidney, Left suprarenal gland, Spleen, Transverse mesocolon, Left dome of diaphragm."
                ],
                pathophysiologySteps: [
                  "Peptic ulcer perforation commonly penetrates the posterior wall into lesser sac.",
                  "Posterior gastric ulcer can erode the Splenic Artery, causing catastrophic intra-abdominal hemorrhage.",
                  "Anterior wall perforation leaks into greater peritoneal sac causing peritonitis."
                ],
                clinicalManifestations: [
                  "Severe epigastric pain radiating to back (posterior penetration into pancreas).",
                  "Peritoneal signs: Board-like rigidity, guarding, absent bowel sounds."
                ],
                diagnosticWorkup: {
                  goldStandard: "EGD (Esophagogastroduodenoscopy) with rapid urease test & histopathology",
                  routineLabs: ["Serum Gastrin levels", "Hemoglobin (iron deficiency anemia detection)"],
                  imaging: ["Erect chest X-ray showing free gas under right dome of diaphragm in perforation"]
                },
                stagingOrScoring: "TNM Staging for Gastric Adenocarcinoma.",
                comprehensiveManagement: {
                  emergency: "Nasogastric suction decompression, aggressive IV crystalloids, broad-spectrum IV antibiotics.",
                  medicalTherapy: ["Triple therapy for H. Pylori (PPI + Clarithromycin + Amoxicillin)", "IV Proton Pump Inhibitor bolus + infusion"],
                  surgicalOrDefinitive: [
                    "Perforated ulcer: Graham patch (omental patch closure).",
                    "Gastric cancer: Radical gastrectomy with Roux-en-Y reconstruction and D2 lymph node dissection."
                  ]
                },
                complications: ["Gastric outlet obstruction", "Upper GI bleed", "Hour-glass stomach from cicatrization"],
                topperFlowchart: "Celiac Axis -> Left Gastric + Common Hepatic + Splenic Artery -> Gastric Arch Networks along Lesser & Greater Curvatures",
                diagramChecklist: [
                  "Stomach bed labeled with all 7 classic posterior organs",
                  "Arteries: Left/Right gastric along lesser curvature, Left/Right gastroepiploic along greater curvature",
                  "Short gastric branches (5-7) arising from splenic artery supplying fundus",
                  "Incisura angularis and transpyloric plane markers"
                ]
              },
              mnemonic: {
                title: "Stomach Bed Structures (Bed of Stomach)",
                letters: [
                  { letter: "P", description: "Pancreas (body & tail)" },
                  { letter: "S", description: "Splenic artery & Spleen" },
                  { letter: "L", description: "Left kidney & Left suprarenal" },
                  { letter: "T", description: "Transverse mesocolon" },
                  { letter: "D", description: "Diaphragm (left dome)" }
                ],
                explanation: "'Doctors Treat Patients with Splenic Legions' or 'Please Stop Letting The Doctor Drink'."
              }
            }
          }
        ]
      },
      {
        id: 'physio-102',
        name: 'Human Physiology',
        code: 'PHY-I',
        paperTitle: 'General, Nerve-Muscle, Blood, Renal, CVS & Respiratory Physiology',
        qSize: '4.2 MB',
        aSize: '3.1 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'physio-ap',
            title: 'Action Potential in Nerve & Cardiac Muscle - Ionic Basis & Refractory Period',
            subject: 'Human Physiology',
            year: '1',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            diagramType: 'action-potential',
            answers: {
              mark2: {
                definition: "An action potential is a rapid, all-or-none reversal and restoration of membrane electrical potential across an excitable cell membrane.",
                keyPoints: [
                  "Resting membrane potential of nerve axon: -70 mV; threshold: -55 mV.",
                  "Depolarization caused by voltage-gated Na+ influx; repolarization by voltage-gated K+ efflux."
                ],
                clinicalPearls: "Local anesthetics like Lignocaine act by blocking voltage-gated Na+ channels from the intracellular side."
              },
              mark5: {
                heading: "Cardiac Ventricular Action Potential (Phases 0 to 4)",
                introduction: "Unlike nerve action potentials (which last 1-2 ms), ventricular action potentials last 200-300 ms with a prominent plateau phase.",
                etiologyOrPathology: "Phase 0 (Rapid Depolarization - fast Na+ influx); Phase 1 (Transient Repolarization - transient outward K+ / Ito); Phase 2 (Plateau - balanced L-type Ca2+ influx and delayed rectifier K+ efflux); Phase 3 (Rapid Repolarization - K+ efflux / IKr & IKs); Phase 4 (Resting potential maintained by Na+/K+ ATPase).",
                clinicalFeatures: [
                  "Prolonged refractory period prevents tetanic contraction of cardiac muscle, allowing rhythmic ventricular filling."
                ],
                investigations: ["12-lead Electrocardiogram (ECG)", "Serum Electrolyte panel (K+, Ca2+, Mg2+)"],
                treatmentSummary: "Antiarrhythmic classification (Vaughan-Williams Classes I-IV) targets specific phases of this curve.",
                diagramSuggestion: "Draw classic spike, notch, plateau, and repolarization graph with labeled ionic currents (INa, ICa-L, IK)."
              },
              mark10: {
                goldStandardTitle: "Cardiac vs Nerve Action Potential: Ionic Currents, Gating Mechanisms & Refractory Periods",
                introAndDefinition: "Action potentials allow rapid signal conduction across axons and coordinated excitation-contraction coupling in the myocardium.",
                classificationOrAnatomy: [
                  "Nerve Action Potential: Fast duration (1 ms), no plateau, Absolute Refractory Period (ARP) equals duration of spike.",
                  "Ventricular Muscle: Long duration (250 ms), prominent Phase 2 plateau mediated by L-type calcium channels (dihydropyridine receptors).",
                  "SA Nodal Pacemaker: Spontaneous Phase 4 prepotential depolarization mediated by If ('funny' hyperpolarization-activated cyclic nucleotide-gated channels)."
                ],
                pathophysiologySteps: [
                  "Resting state: High intracellular K+ (140 mM), high extracellular Na+ (142 mM).",
                  "Threshold reached -> M-gates of voltage-gated Na+ channels open rapidly -> Inward Na+ current.",
                  "H-gates of Na+ channels close (inactivation) at +30 mV, establishing the Absolute Refractory Period.",
                  "Cardiac Phase 2 Ca2+ entry triggers Ryanodine Receptor 2 (RyR2) on sarcoplasmic reticulum -> Calcium-Induced Calcium Release (CICR)."
                ],
                clinicalManifestations: [
                  "Hypokalemia lowers resting potential and predisposes to U-waves, ventricular ectopy, and Torsades de Pointes.",
                  "Hyperkalemia inactivates Na+ channels, causing tall peaked T waves, widened QRS, and asystole."
                ],
                diagnosticWorkup: {
                  goldStandard: "Patch-clamp electrophysiology (research standard) / Clinical Surface ECG",
                  routineLabs: ["Serum Potassium, Calcium, Magnesium", "Troponin I"],
                  imaging: ["Echocardiography for structural wall motion assessment"]
                },
                stagingOrScoring: "Vaughan-Williams Antiarrhythmic Drug Classification.",
                comprehensiveManagement: {
                  emergency: "Hyperkalemia with widened QRS: Immediate IV 10% Calcium Gluconate (membrane stabilization) within 3 minutes.",
                  medicalTherapy: ["Class I: Flecainide (Na+ blockers)", "Class II: Metoprolol (Beta blockers)", "Class III: Amiodarone (K+ blockers)", "Class IV: Verapamil (Ca2+ blockers)"],
                  surgicalOrDefinitive: ["Radiofrequency Catheter Ablation for accessory pathways (e.g., Wolff-Parkinson-White)."]
                },
                complications: ["Ventricular fibrillation", "Electromechanical dissociation", "Sudden cardiac death"],
                topperFlowchart: "Stimulus -> Threshold -> Fast Na+ Influx -> Phase 1 Notch -> L-type Ca2+ Influx (Plateau) -> Delayed K+ Efflux -> Phase 4 Restoration",
                diagramChecklist: [
                  "Nerve AP curve side-by-side with Cardiac Ventricular AP curve",
                  "X-axis: Time (ms); Y-axis: Millivolts (-90 mV to +30 mV)",
                  "Absolute Refractory Period (ARP) and Relative Refractory Period (RRP) shaded zones",
                  "Label each Phase (0, 1, 2, 3, 4) with dominant ion movement"
                ]
              },
              mnemonic: {
                title: "Vaughan Williams Antiarrhythmic Classes",
                letters: [
                  { letter: "N", description: "No (Class I: Na+ channel blockers)" },
                  { letter: "B", description: "Bad (Class II: Beta-blockers)" },
                  { letter: "B", description: "Boy (Class III: Potassium channel blockers)" },
                  { letter: "C", description: "Cries (Class IV: Calcium channel blockers)" }
                ],
                explanation: "'No Bad Boy Cries' corresponds to Sodium, Beta, Potassium, Calcium."
              }
            }
          }
        ]
      },
      {
        id: 'biochem-103',
        name: 'Biochemistry',
        code: 'BIO-I',
        paperTitle: 'Metabolism, Molecular Biology, Clinical Chemistry & Genetics',
        qSize: '3.9 MB',
        aSize: '2.8 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'biochem-krebs',
            title: 'Tricarboxylic Acid (TCA) Cycle - Energetics, Regulation & Amphibolic Role',
            subject: 'Biochemistry',
            year: '1',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            answers: {
              mark2: {
                definition: "The TCA (Krebs) cycle is a series of mitochondrial enzymatic reactions that catabolize Acetyl-CoA derived from carbohydrates, fats, and proteins into CO2, H2O, and high-energy phosphates.",
                keyPoints: [
                  "Location: Mitochondrial matrix (except Succinate Dehydrogenase which is on the inner mitochondrial membrane).",
                  "Net yield per Acetyl-CoA oxidized: 3 NADH (7.5 ATP) + 1 FADH2 (1.5 ATP) + 1 GTP (1 ATP) = 10 ATP."
                ],
                clinicalPearls: "Fluoroacetate (rat poison) inhibits Aconitase, causing lethal TCA cycle arrest."
              },
              mark5: {
                heading: "Amphibolic Nature of TCA Cycle & Anaplerotic Reactions",
                introduction: "The TCA cycle is dual-purpose: catabolic (fuel oxidation) and anabolic (providing precursor molecules for biosynthetic pathways).",
                etiologyOrPathology: "Anabolic pathways utilizing intermediates include: Oxaloacetate for gluconeogenesis & aspartate; Alpha-ketoglutarate for glutamate & GABA; Succinyl-CoA for heme synthesis; Citrate for cytosolic fatty acid and cholesterol synthesis.",
                clinicalFeatures: [
                  "Pyruvate carboxylase deficiency results in lactic acidosis, hyperammonemia, and severe neurodevelopmental delay."
                ],
                investigations: ["Serum lactate and pyruvate levels", "Urine organic acid analysis by GC-MS"],
                treatmentSummary: "High-protein diet, biotin supplementation, avoiding prolonged fasting.",
                diagramSuggestion: "Circular cycle showing exit arrows for biosynthetic precursors and entrance arrows for anaplerotic replenishment."
              },
              mark10: {
                goldStandardTitle: "TCA Cycle: Stepwise Enzymatic Reactions, Substrate-Level Phosphorylation & Complete ATP Accounting",
                introAndDefinition: "The final common oxidative pathway for nutrients. Operates strictly under aerobic conditions because oxidized NAD+ and FAD coenzymes must be regenerated by the electron transport chain.",
                classificationOrAnatomy: [
                  "Step 1: Condensation of Acetyl-CoA (2C) + Oxaloacetate (4C) -> Citrate (6C) by Citrate Synthase.",
                  "Step 2: Isomerization of Citrate to Isocitrate via cis-aconitate by Aconitase (iron-sulfur protein).",
                  "Step 3: First Oxidative Decarboxylation -> Alpha-ketoglutarate + NADH + CO2 by Isocitrate Dehydrogenase (rate limiting step).",
                  "Step 4: Second Oxidative Decarboxylation -> Succinyl-CoA + NADH + CO2 by Alpha-ketoglutarate Dehydrogenase Complex.",
                  "Step 5: Substrate-level phosphorylation -> Succinate + GTP by Succinate Thiokinase (Succinyl-CoA synthetase).",
                  "Step 6: Dehydrogenation -> Fumarate + FADH2 by Succinate Dehydrogenase (Complex II).",
                  "Step 7: Hydration -> L-Malate by Fumarase.",
                  "Step 8: Regeneration of Oxaloacetate + NADH by Malate Dehydrogenase."
                ],
                pathophysiologySteps: [
                  "Arsenite binds to lipoic acid sulfhydryl groups in alpha-ketoglutarate dehydrogenase and pyruvate dehydrogenase complexes.",
                  "Inhibits respiration and cellular energy production, leading to multi-organ failure."
                ],
                clinicalManifestations: ["Lactic acidosis, lethargy, muscle weakness, encephalopathy."],
                diagnosticWorkup: {
                  goldStandard: "Mitochondrial enzymatic assays in cultured fibroblasts",
                  routineLabs: ["Anion gap metabolic acidosis", "Elevated plasma lactate/pyruvate ratio"],
                  imaging: ["Brain MRI showing basal ganglia hyperintensity in Leigh's syndrome"]
                },
                stagingOrScoring: "P/O Ratio calculations: 2.5 ATP per NADH, 1.5 ATP per FADH2.",
                comprehensiveManagement: {
                  emergency: "Correction of severe acidosis with IV sodium bicarbonate buffer.",
                  medicalTherapy: ["Thiamine (Vitamin B1) supplementation", "Biotin co-factor therapy", "Carnitine supplementation"],
                  surgicalOrDefinitive: ["Supportive care and metabolic diet optimization."]
                },
                complications: ["Mitochondrial myopathy", "Lactic acidosis coma"],
                topperFlowchart: "Pyruvate -> Acetyl-CoA -> Citrate -> Isocitrate -> Alpha-KG -> Succinyl-CoA -> Succinate -> Fumarate -> Malate -> Oxaloacetate",
                diagramChecklist: [
                  "All 8 intermediate substrates with chemical carbon count (6C, 5C, 4C)",
                  "Enzymes written over every arrow with required cofactors (TPP, Lipoamide, FAD, NAD, CoA)",
                  "Clear highlights where NADH (3 sites), FADH2 (1 site), and GTP (1 site) are generated",
                  "Substrate-level phosphorylation marked with double-star"
                ]
              },
              mnemonic: {
                title: "Krebs Cycle Substrates Order",
                letters: [
                  { letter: "C", description: "Citrate (Can)" },
                  { letter: "I", description: "Isocitrate (I)" },
                  { letter: "K", description: "Alpha-Ketoglutarate (Keep)" },
                  { letter: "S", description: "Succinyl-CoA (Selling)" },
                  { letter: "S", description: "Succinate (Sex)" },
                  { letter: "F", description: "Fumarate (For)" },
                  { letter: "M", description: "Malate (Money)" },
                  { letter: "O", description: "Oxaloacetate (Officer?)" }
                ],
                explanation: "'Can I Keep Selling Sex For Money, Officer?' or 'Citrate Is Krebs' Special Starting Fantastic Metabolic Organelle'."
              }
            }
          }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    name: '2nd Year MBBS',
    phase: 'Para-Clinical Phase',
    duration: '12 Months (Pathology, Pharmacology, Microbiology, FMT)',
    subjects: [
      {
        id: 'path-201',
        name: 'Pathology',
        code: 'PATH-II',
        paperTitle: 'General Pathology, Hematology & Systemic Pathology',
        qSize: '5.4 MB',
        aSize: '4.2 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'path-cml',
            title: 'Chronic Myeloid Leukemia (CML) - Cytogenetics, Blood Picture & LAP Score',
            subject: 'Pathology',
            year: '2',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            answers: {
              mark2: {
                definition: "CML is a clonal myeloproliferative neoplasm characterized by proliferation of the granulocytic lineage without loss of differentiation.",
                keyPoints: [
                  "Hallmark cytogenetic lesion: Philadelphia chromosome t(9;22)(q34;q11) resulting in the BCR-ABL1 chimeric oncoprotein with constitutive tyrosine kinase activity.",
                  "Classic clinical sign: Massive, splenomegaly extending towards the right iliac fossa."
                ],
                clinicalPearls: "Leukocyte Alkaline Phosphatase (LAP) score is low or zero in CML, whereas it is markedly elevated (>100) in a benign leukemoid reaction."
              },
              mark5: {
                heading: "Peripheral Blood & Bone Marrow Picture in CML",
                introduction: "Marked leukocytosis typically ranging between 100,000 to 500,000 / microL with a full spectrum of granulocytic precursors.",
                etiologyOrPathology: "Peripheral smear shows 'myeloid bulge': predominance of myelocytes and metamyelocytes over promyelocytes and blasts (blasts <2% in chronic phase). Absolute basophilia and eosinophilia are universal hallmarks.",
                clinicalFeatures: [
                  "B symptoms: weight loss, low-grade night fevers, dragging sensation in left upper abdomen from massive splenomegaly."
                ],
                investigations: ["Peripheral Blood Smear", "Bone marrow aspiration & trephine biopsy", "RT-PCR for BCR-ABL1 transcript"],
                treatmentSummary: "Targeted Tyrosine Kinase Inhibitors (TKIs): Imatinib (1st gen), Dasatinib, Nilotinib (2nd gen).",
                diagramSuggestion: "Draw peripheral smear showing mature neutrophils, band forms, metamyelocytes, myelocytes, and prominent basophils."
              },
              mark10: {
                goldStandardTitle: "CML: Pathogenesis, Stages (Chronic, Accelerated, Blast Crisis), Lab Workup & Differential Diagnosis",
                introAndDefinition: "CML accounts for 15-20% of all adult leukemias. Arises from a multipotent hematopoietic stem cell that acquires the BCR-ABL fusion gene.",
                classificationOrAnatomy: [
                  "Chronic Phase: Blasts <10% in peripheral blood and bone marrow, responsive to TKIs.",
                  "Accelerated Phase: Blasts 10-19%, persistent thrombocytosis (>1000k) or thrombocytopenia (<100k) unrelated to therapy, worsening splenomegaly.",
                  "Blast Crisis: Blasts >=20% in blood/bone marrow or extramedullary blastic proliferation (70% Myeloid, 30% Lymphoid blast crisis)."
                ],
                pathophysiologySteps: [
                  "Reciprocal translocation between chromosome 9 (ABL1 proto-oncogene) and chromosome 22 (BCR gene).",
                  "Formation of Philadelphia (Ph) chromosome (shortened chromosome 22).",
                  "Synthesizes p210 (or p190/p230) BCR-ABL1 oncoprotein with dysregulated Tyrosine Kinase activity.",
                  "Downstream activation of RAS/MAPK, JAK/STAT, and PI3K/AKT pathways -> enhanced cell proliferation and inhibition of apoptosis."
                ],
                clinicalManifestations: [
                  "Splenomegaly in >90% of cases (often massive, smooth, non-tender with distinct notch).",
                  "Hypermetabolic symptoms (fever, night sweats, fatigue), sternal tenderness (due to marrow expansion)."
                ],
                diagnosticWorkup: {
                  goldStandard: "Quantitative RT-PCR for BCR-ABL1 transcripts & Karyotyping for t(9;22)",
                  routineLabs: ["Complete Blood Count (Leukocytosis with left shift)", "LAP (Neutrophil Alkaline Phosphatase) score: markedly decreased"],
                  imaging: ["Abdominal Ultrasound measuring craniocaudal splenic dimension (>15-20 cm)"]
                },
                stagingOrScoring: "Sokal Score and Hasford Score to stratify prognostic risk.",
                comprehensiveManagement: {
                  emergency: "Hyperleukocytosis (>300,000/uL with leukostasis): Hydration, Allopurinol/Rasburicase, and Hydroxyurea cytoreduction.",
                  medicalTherapy: [
                    "First-line: Imatinib mesylate 400 mg daily oral (competitive ATP-binding site inhibitor).",
                    "Second-line TKIs: Dasatinib (100 mg/day) or Nilotinib (300 mg BID) for resistant disease or high-risk patients.",
                    "Third-line: Ponatinib for T315I gatekeeper mutation."
                  ],
                  surgicalOrDefinitive: ["Allogeneic Hematopoietic Stem Cell Transplantation (allo-HSCT) for blast crisis or pan-TKI resistance."]
                },
                complications: ["Blast transformation to AML/ALL", "Splenic infarction", "Gout secondary to hyperuricemia"],
                topperFlowchart: "t(9;22) -> BCR-ABL1 fusion -> Constitutive Tyrosine Kinase -> Myeloid Proliferation -> Chronic Phase -> Accelerated -> Blast Crisis",
                diagramChecklist: [
                  "Cytogenetic ideogram showing chromosomes 9 and 22 reciprocal translocation",
                  "Peripheral blood smear field with labeled cells (Basophil, Myelocyte, Neutrophil)",
                  "Comparative table: CML vs Leukemoid Reaction (Toxic granulation, LAP score, Ph chromosome, Basophilia)"
                ]
              },
              mnemonic: {
                title: "Differentiating CML from Leukemoid Reaction",
                letters: [
                  { letter: "B", description: "Basophilia (Present in CML, Absent in Leukemoid)" },
                  { letter: "L", description: "LAP score (Low in CML, High in Leukemoid)" },
                  { letter: "A", description: "Atypical/Blasts (Present in CML)" },
                  { letter: "S", description: "Splenomegaly (Massive in CML, Absent in Leukemoid)" },
                  { letter: "T", description: "t(9;22) Ph chromosome (Positive in CML)" }
                ],
                explanation: "'BLAST' differentiates neoplastic CML from reactive Leukemoid Reaction."
              }
            }
          }
        ]
      },
      {
        id: 'pharm-202',
        name: 'Pharmacology',
        code: 'PHARM-II',
        paperTitle: 'General Pharmacology, ANS, CVS, CNS, Autacoids, Chemotherapy',
        qSize: '4.9 MB',
        aSize: '3.8 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'pharm-hf',
            title: 'Congestive Heart Failure - Drug Therapy & The 4 Pillars (ARNI, Beta-blocker, MRA, SGLT2i)',
            subject: 'Pharmacology',
            year: '2',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            answers: {
              mark2: {
                definition: "Heart Failure with reduced Ejection Fraction (HFrEF) is a clinical syndrome caused by ventricular systolic dysfunction (EF <= 40%) leading to inadequate organ perfusion.",
                keyPoints: [
                  "The Guideline Directed Medical Therapy (GDMT) 4 pillars: ARNI/ACEi, Beta-Blocker, MRA (Spironolactone), and SGLT2 inhibitor (Dapagliflozin).",
                  "Digoxin improves symptoms and reduces hospitalization but does NOT reduce overall mortality."
                ],
                clinicalPearls: "Beta-blockers proven to reduce mortality in HFrEF: Bisoprolol, Carvedilol, and Metoprolol Succinate ('BCM')."
              },
              mark5: {
                heading: "Sacubitril/Valsartan (ARNI) Mechanism & Advantages",
                introduction: "First-in-class Angiotensin Receptor-Neprilysin Inhibitor (ARNI) that simultaneously blocks AT1 receptors and inhibits the degradation of natriuretic peptides.",
                etiologyOrPathology: "Neprilysin enzyme normally breaks down BNP, ANP, and bradykinin. Inhibiting neprilysin with Sacubitril increases natriuresis, vasodilation, and antifibrotic actions. Valsartan prevents unopposed angiotensin II vasoconstriction.",
                clinicalFeatures: [
                  "Mandatory 36-hour washout period when switching from an ACE inhibitor to prevent fatal angioedema."
                ],
                investigations: ["Serum Potassium & Creatinine monitoring", "Baseline NT-proBNP (note: BNP rises with ARNI, use NT-proBNP instead)"],
                treatmentSummary: "PARADIGM-HF trial demonstrated a 20% relative reduction in cardiovascular death or HF hospitalizations compared to Enalapril.",
                diagramSuggestion: "Draw dual pathway diagram: Neprilysin inhibition (increasing BNP/cGMP) alongside AT1 receptor blockade."
              },
              mark10: {
                goldStandardTitle: "Pharmacotherapy of Heart Failure: Molecular Mechanisms, Hemodynamic Effects & GDMT Protocols",
                introAndDefinition: "Heart failure treatment has evolved from symptomatic hemodynamic unloading with inotropes and diuretics to neurohormonal antagonism preventing adverse ventricular remodeling and death.",
                classificationOrAnatomy: [
                  "Pillar 1: ARNI (Sacubitril/Valsartan) or ACEi (Enalapril/Ramipril) / ARB.",
                  "Pillar 2: Evidence-based Beta-Blockers (Carvedilol, Bisoprolol, Metoprolol Succinate).",
                  "Pillar 3: Mineralocorticoid Receptor Antagonists (Spironolactone, Eplerenone).",
                  "Pillar 4: SGLT2 Inhibitors (Dapagliflozin 10 mg or Empagliflozin 10 mg OD).",
                  "Symptom Relief: Loop Diuretics (Furosemide, Torsemide).",
                  "Add-on therapies: Ivabradine (if HR >70 in sinus rhythm), Hydralazine + Isosorbide Dinitrate."
                ],
                pathophysiologySteps: [
                  "Decreased cardiac output activates the sympathetic nervous system and Renin-Angiotensin-Aldosterone System (RAAS).",
                  "Chronic catecholamines and Angiotensin II trigger myocyte hypertrophy, apoptosis, and myocardial interstitial fibrosis.",
                  "The 4 pillars break this maladaptive spiral, facilitating reverse left ventricular remodeling."
                ],
                clinicalManifestations: [
                  "Exertional dyspnea, orthopnea, paroxysmal nocturnal dyspnea (PND), elevated JVP, S3 gallop, bilateral pedal edema."
                ],
                diagnosticWorkup: {
                  goldStandard: "Transthoracic Echocardiogram (LVEF measurement)",
                  routineLabs: ["Serum NT-proBNP", "Serum Electrolytes (Na+, K+)", "Serum Creatinine & eGFR"],
                  imaging: ["Chest X-ray: Cardiomegaly (CTR > 50%), Kerley B lines, pulmonary congestion"]
                },
                stagingOrScoring: "ACC/AHA Stages (A, B, C, D) and NYHA Functional Classes (I through IV).",
                comprehensiveManagement: {
                  emergency: "Acute Decompensated Heart Failure (Warm & Wet): IV Furosemide bolus (2-2.5x oral dose), IV Nitroglycerin infusion, Non-invasive ventilation (BiPAP/CPAP).",
                  medicalTherapy: [
                    "Initiate all 4 pillars simultaneously at low doses and titrate upwards every 2 weeks.",
                    "Potassium sparing precaution: Discontinue MRA if serum K+ exceeds 5.5 mEq/L.",
                    "SGLT2 inhibitors provide renal protection and reduce HF hospitalization independent of diabetes status."
                  ],
                  surgicalOrDefinitive: [
                    "Cardiac Resynchronization Therapy (CRT-D) for QRS >150 ms with LBBB pattern.",
                    "Left Ventricular Assist Device (LVAD) or Orthotopic Heart Transplantation for Stage D refractory failure."
                  ]
                },
                complications: ["Refractory pulmonary edema", "Cardiorenal syndrome Type 1/2", "Lethal ventricular arrhythmias"],
                topperFlowchart: "Myocardial Insult -> Low CO -> SNS + RAAS Hyperactivity -> Remodeling & Dilatation -> 4 Pillars Interruption -> Survival Benefit",
                diagramChecklist: [
                  "Chart of the 4 GDMT pillars with their respective clinical trials (PARADIGM-HF, DAPA-HF, RALES, COPERNICUS)",
                  "Neprilysin-Angiotensin dual pathway schematic",
                  "Frank-Starling myocardial performance curve showing shifts with inotropes and afterload reducers"
                ]
              },
              mnemonic: {
                title: "4 Pillars of HFrEF Mortality Reduction",
                letters: [
                  { letter: "B", description: "Beta-Blockers (Bisoprolol/Carvedilol/Metoprolol)" },
                  { letter: "A", description: "ARNI / ACEi (Sacubitril/Valsartan)" },
                  { letter: "M", description: "MRA (Spironolactone / Eplerenone)" },
                  { letter: "S", description: "SGLT2i (Dapagliflozin / Empagliflozin)" }
                ],
                explanation: "'B-A-M-S' strikes down heart failure mortality."
              }
            }
          }
        ]
      },
      {
        id: 'micro-203',
        name: 'Microbiology',
        code: 'MICRO-II',
        paperTitle: 'General Bacteriology, Immunology, Virology, Mycology & Parasitology',
        qSize: '4.6 MB',
        aSize: '3.4 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'micro-tb',
            title: 'Mycobacterium Tuberculosis - Morphology, Culture & CBNAAT/GeneXpert',
            subject: 'Microbiology',
            year: '2',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            answers: {
              mark2: {
                definition: "Mycobacterium tuberculosis is a slender, rod-shaped, non-motile, non-sporing, obligate aerobe characterized by acid-fastness due to cell wall mycolic acids.",
                keyPoints: [
                  "Staining: Ziehl-Neelsen (ZN) stain (appears bright red against methylene blue background).",
                  "Culture: Lowenstein-Jensen (LJ) medium showing rough, tough, buff-colored colonies in 6-8 weeks."
                ],
                clinicalPearls: "GeneXpert (CBNAAT) provides automated cartridge-based results within 2 hours, detecting both MTB DNA and Rifampicin resistance (rpoB gene mutations)."
              },
              mark5: {
                heading: "GeneXpert / CBNAAT & TrueNat Diagnostics",
                introduction: "Real-time automated nested PCR assay that amplifies the 81-bp Rifampicin Resistance Determining Region (RRDR) of the rpoB gene of MTB.",
                etiologyOrPathology: "Sensitivity >98% in smear-positive sputum; ~70% in smear-negative sputum. Eliminates technical staining bias and rapid multi-drug resistance screening.",
                clinicalFeatures: [
                  "Chronic cough >2 weeks, evening rise of temperature with night sweats, hemoptysis, significant weight loss."
                ],
                investigations: ["Spot and early-morning sputum sample collection", "Chest X-ray PA view"],
                treatmentSummary: "NTEP Fixed-Dose Combination (FDC) regimen: 2HRZE + 4HRE.",
                diagramSuggestion: "Draw diagram of mycobacterial cell wall showing peptidoglycan, arabinogalactan, and thick outer mycolic acid layer."
              },
              mark10: {
                goldStandardTitle: "Mycobacterium Tuberculosis: Pathogenesis, Granuloma Formation, Laboratory Diagnosis & NTEP Regimens",
                introAndDefinition: "Tuberculosis remains the leading infectious cause of mortality globally. Droplet nuclei (<5 microns) reach alveoli and are engulfed by alveolar macrophages.",
                classificationOrAnatomy: [
                  "Complex Members: M. tuberculosis, M. bovis, M. africanum, M. canettii, M. microti.",
                  "Atypical Mycobacteria (NTM): Runyon classification (Photochromogens, Scotochromogens, Non-chromogens, Rapid growers)."
                ],
                pathophysiologySteps: [
                  "Phagocytosis by alveolar macrophages -> Cord factor prevents phagolysosome fusion.",
                  "Cell-Mediated Immunity triggered after 3 weeks: Th1 lymphocytes secrete IFN-gamma, activating macrophages.",
                  "Activated macrophages transform into epithelioid cells and Langhans multinucleated giant cells -> Caseating Granuloma formation."
                ],
                clinicalManifestations: [
                  "Primary TB: Ghon focus (subpleural mid-lung) + lymphangitis + hilar lymphadenitis = Ghon's Complex.",
                  "Secondary (Post-primary) TB: Apical cavitary lesion with tissue destruction and bronchogenic spread."
                ],
                diagnosticWorkup: {
                  goldStandard: "Automated Liquid Culture (MGIT 960 - Mycobacteria Growth Indicator Tube) in 10-14 days",
                  routineLabs: ["ZN Stain / Auramine-O Fluorescent staining (10,000 bacilli/mL threshold)", "GeneXpert MTB/RIF Ultra"],
                  imaging: ["Chest X-ray: Infiltrates/cavitations in apical and posterior segments of upper lobes"]
                },
                stagingOrScoring: "NTEP Diagnostic Algorithm for Presumptive Pulmonary TB.",
                comprehensiveManagement: {
                  emergency: "Massive hemoptysis: Position bleeding lung down, bronchial artery embolization (BAE).",
                  medicalTherapy: [
                    "Intensive Phase (2 Months): Isoniazid (H), Rifampicin (R), Pyrazinamide (Z), Ethambutol (E) daily.",
                    "Continuation Phase (4 Months): Isoniazid, Rifampicin, Ethambutol daily.",
                    "MDR-TB (Rifampicin resistant): BPaLM regimen (Bedaquiline, Pretomanid, Linezolid, Moxifloxacin) for 6 months."
                  ],
                  surgicalOrDefinitive: ["Lobectomy/Pneumonectomy in destroyed lung syndrome or refractory cavitary disease with recurrent life-threatening bleeds."]
                },
                complications: ["Miliary tuberculosis", "Tuberculous meningitis", "Bronchiectasis", "Aspergilloma inside healed cavity"],
                topperFlowchart: "Inhalation -> Macrophage Entry -> Cord Factor -> Th1 Activation -> IFN-gamma -> Epithelioid Granuloma -> Central Caseation",
                diagramChecklist: [
                  "Microscopic field of Caseating Granuloma: Central caseous necrosis, rim of epithelioid cells, Langhans giant cells with horseshoe nuclei, peripheral mantle of lymphocytes",
                  "Cell wall layer structure with mycolic acid",
                  "Ghon's complex diagram on lung schema"
                ]
              },
              mnemonic: {
                title: "First Line Anti-TB Drugs & Adverse Effects",
                letters: [
                  { letter: "R", description: "Rifampicin (Red-orange secretions, RNA polymerase inhibitor)" },
                  { letter: "I", description: "Isoniazid (INH) (Peripheral neuropathy due to B6 deficiency, Hepatotoxicity)" },
                  { letter: "P", description: "Pyrazinamide (Hyperuricemia/Gout, Hepatotoxicity)" },
                  { letter: "E", description: "Ethambutol (Eye/Optic neuritis - red-green color blindness)" },
                  { letter: "S", description: "Streptomycin (Ototoxicity & Nephrotoxicity)" }
                ],
                explanation: "'R-I-P-E-S' drugs kill tuberculosis."
              }
            }
          }
        ]
      }
    ]
  },
  '3': {
    id: '3',
    name: '3rd Year MBBS (Part 1)',
    phase: 'Clinical Phase 1',
    duration: '12 Months (PSM, Ophthalmology, ENT)',
    subjects: [
      {
        id: 'psm-301',
        name: 'Community Medicine (PSM)',
        code: 'PSM-III',
        paperTitle: 'Epidemiology, Biostatistics, National Health Programs, Health Administration',
        qSize: '4.5 MB',
        aSize: '3.5 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'psm-coldchain',
            title: 'Cold Chain Equipment & Vaccine Vial Monitor (VVM) in Universal Immunization',
            subject: 'Community Medicine (PSM)',
            year: '3',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            answers: {
              mark2: {
                definition: "The cold chain is a system of storing and transporting vaccines at recommended temperatures from the manufacturer to the point of administration.",
                keyPoints: [
                  "Temperature range for most vaccines: +2°C to +8°C.",
                  "Most heat-sensitive vaccine: Oral Polio Vaccine (OPV); Most freeze-sensitive vaccine: Hepatitis B, Td/Tetanus Toxoid."
                ],
                clinicalPearls: "The Shake Test is performed on suspected frozen vaccines (Hepatitis B, DPT, Td) to check for flocculation; if sediment forms rapidly, the vaccine must be discarded."
              },
              mark5: {
                heading: "Vaccine Vial Monitor (VVM) Stages & Interpretation",
                introduction: "A thermo-chemical label affixed to vaccine vials that registers cumulative heat exposure over time by gradual darkening of an inner square compared to an outer circle.",
                etiologyOrPathology: "Stage 1: Inner square lighter than outer circle -> Usable. Stage 2: Inner square still lighter than outer circle -> Usable (use first). Stage 3: Inner square matches color of outer circle -> DO NOT USE. Stage 4: Inner square darker than outer circle -> DO NOT USE.",
                clinicalFeatures: ["Administering heat-degraded vaccines causes vaccination failure and loss of herd immunity."],
                investigations: ["Twice daily temperature recording using dial thermometer or digital data loggers in ILR"],
                treatmentSummary: "Replace non-functioning cold chain units with solar direct drive (SDD) refrigeration.",
                diagramSuggestion: "Draw 4 circular diagrams showing stages 1 to 4 with shading in the inner square."
              },
              mark10: {
                goldStandardTitle: "Cold Chain: System Components (ILR, Deep Freezer, Vaccine Carriers), Failure Protocols & UIP Schedule",
                introAndDefinition: "The backbone of the Universal Immunization Program (UIP). Any breakdown in the cold chain renders vaccines irreversibly denatured.",
                classificationOrAnatomy: [
                  "Primary / Regional Level: Walk-in Coolers (WIC) (+2 to +8°C) and Walk-in Freezers (WIF) (-20°C).",
                  "District Level: Ice-Lined Refrigerators (ILR) and Deep Freezers (DF).",
                  "PHC / CHC Level: Small ILR, Deep Freezer for conditioning ice packs.",
                  "Sub-centre & Outreach Level: Vaccine carriers (with 4 conditioned ice packs) holding vaccines safely for up to 12-24 hours."
                ],
                pathophysiologySteps: [
                  "Heat denatures protein antigens in viral/bacterial vaccines.",
                  "Accidental freezing breaks aluminum adjuvant emulsion in absorbed vaccines (Hepatitis B, DPT, Td), causing clumping and severe local injection site reactions."
                ],
                clinicalManifestations: ["Breakthrough infection epidemics in vaccinated communities."],
                diagnosticWorkup: {
                  goldStandard: "Shake Test for freeze damage & Continuous Electronic Vaccine Intelligence Network (eVIN) monitoring",
                  routineLabs: ["Batch sterility testing if contamination suspected"],
                  imaging: ["Daily graphical temperature monitoring log review"]
                },
                stagingOrScoring: "VVM Stages 1 to 4 decision matrix.",
                comprehensiveManagement: {
                  emergency: "Power Outage Protocol: Keep ILR lid closed; Ice-lining maintains safe temperature up to 24-48 hours without electricity.",
                  medicalTherapy: ["Conditioning ice-packs: Allow ice packs to sweat/melt slightly before placing in vaccine carriers to prevent freeze shock."],
                  surgicalOrDefinitive: ["Transitioning rural centers to Solar Direct Drive (SDD) refrigerators."]
                },
                complications: ["Cold abscess formation from frozen DPT", "Loss of vaccine potency"],
                topperFlowchart: "Manufacturer -> National Depots (WIC/WIF) -> State/Regional Stores -> District Stores (ILR/DF) -> PHC -> Outreach (Vaccine Carriers) -> Beneficiary",
                diagramChecklist: [
                  "Inside layout of an Ice-Lined Refrigerator (ILR): Bottom holds freeze-tolerant vaccines (measles, OPV), top shelf holds freeze-sensitive vaccines (Hepatitis B, DPT)",
                  "VVM 4 stages diagram with color shading",
                  "Universal Immunization Schedule matrix (Birth, 6, 10, 14 weeks, 9 months)"
                ]
              },
              mnemonic: {
                title: "Vaccine Heat Sensitivity Order (Most to Least)",
                letters: [
                  { letter: "O", description: "OPV (Most heat sensitive)" },
                  { letter: "M", description: "Measles / MR" },
                  { letter: "D", description: "DPT / Pentavalent" },
                  { letter: "B", description: "BCG" },
                  { letter: "T", description: "TT / Hepatitis B (Least heat sensitive)" }
                ],
                explanation: "'Our Mother Does Best Tasks'."
              }
            }
          }
        ]
      },
      {
        id: 'ophth-302',
        name: 'Ophthalmology',
        code: 'OPHTH-III',
        paperTitle: 'Diseases of Eye, Refraction, Glaucoma & Ophthalmic Surgeries',
        qSize: '3.8 MB',
        aSize: '2.9 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'ophth-cataract',
            title: 'Senile Cataract - Etiology, Classification, Morphological Types & Phacoemulsification',
            subject: 'Ophthalmology',
            year: '3',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            answers: {
              mark2: {
                definition: "Cataract is defined as any opacification of the crystalline lens or its capsule that causes impairment of vision.",
                keyPoints: [
                  "Most common cause of treatable blindness worldwide.",
                  "Classic clinical symptom: Painless, progressive, bilateral decrease in vision with colored halos or glare (second sight in nuclear sclerosis)."
                ],
                clinicalPearls: "Phacoemulsification utilizes ultrasonic tip vibration (28-40 kHz) to emulsify the cataract nucleus through a micro-incision (2.2-2.8 mm)."
              },
              mark5: {
                heading: "Stages of Maturation of Cortical Cataract",
                introduction: "Cortical cataract develops through 4 distinct morphological stages over years.",
                etiologyOrPathology: "Stage 1: Lamellar separation / Incipient cataract (cuneiform spokes in periphery). Stage 2: Immature cataract (lens partially opaque, iris shadow present). Stage 3: Mature cataract (pearly white lens, iris shadow absent). Stage 4: Hypermature cataract (Morgagnian fluid liquefaction with sinking nucleus or Shrunken sclerotic capsule).",
                clinicalFeatures: [
                  "Iris shadow test: Positive in Immature; Negative in Mature senile cataract."
                ],
                investigations: ["Slit-lamp biomicroscopy", "Keratometry and A-Scan biometry for IOL power calculation (SRK-T formula)"],
                treatmentSummary: "Surgical lens extraction with Intraocular Lens (IOL) implantation.",
                diagramSuggestion: "Draw cuneiform cortical wedge spokes directed toward the center against red reflex."
              },
              mark10: {
                goldStandardTitle: "Senile Cataract: Surgical Management Comparison (Phaco vs SICS vs ECCE) & Post-Op Complications",
                introAndDefinition: "Age-related cataract results from denatured crystallin proteins, photochemical oxidation, and yellow-brown chromophore accumulation in the lens.",
                classificationOrAnatomy: [
                  "Cortical (hydration leading to vacuoles and cuneiform spokes).",
                  "Nuclear (dehydration and compaction leading to sclerosis and amber-brown discoloration).",
                  "Posterior Subcapsular (plaque beneath posterior capsule, causing glare under bright sunlight)."
                ],
                pathophysiologySteps: [
                  "Compromised Na+/K+ ATPase pump in lens epithelium -> Influx of water and calcium.",
                  "Cross-linking and aggregation of alpha-crystallins -> High molecular weight insolubles.",
                  "Loss of lens transparency and optical diffraction."
                ],
                clinicalManifestations: [
                  "Painless progressive visual loss, monochromatic diplopia, myopic shift ('second sight' enabling reading without presbyopic glasses)."
                ],
                diagnosticWorkup: {
                  goldStandard: "Slit-lamp examination + Optical Biometry (IOLMaster) for IOL power",
                  routineLabs: ["Blood sugar (rule out diabetic cataract)", "Blood pressure, viral markers"],
                  imaging: ["B-scan ultrasonography if dense cataract obscures fundus view (rule out retinal detachment)"]
                },
                stagingOrScoring: "LOCS III (Lens Opacities Classification System).",
                comprehensiveManagement: {
                  emergency: "Phacomorphic glaucoma: Immediate IV Mannitol 20% + Topical Timolol 0.5% + urgent cataract extraction.",
                  medicalTherapy: ["No proven medical cure; surgical intervention is the only definitive cure."],
                  surgicalOrDefinitive: [
                    "Phacoemulsification: Continuous Curvilinear Capsulorhexis (CCC), hydrodissection, nucleus chop, foldable acrylic IOL in the bag.",
                    "Manual Small Incision Cataract Surgery (MSICS): Self-sealing sclero-corneal tunnel, ideal for dense hypermature cataracts in developing countries."
                  ]
                },
                complications: ["Posterior Capsular Rupture (PCR)", "Endophthalmitis", "Posterior Capsule Opacification (PCO / After-cataract treated with Nd:YAG laser capsulotomy)"],
                topperFlowchart: "Corneal Incision -> CCC -> Hydrodissection -> Phaco Nuclear Chop -> Cortex Aspiration -> Foldable IOL -> Hydration of Incisions",
                diagramChecklist: [
                  "Cross-section of human crystalline lens showing capsule, cortex, and nucleus",
                  "Cuneiform cortical spokes vs Nuclear cataract cross-section",
                  "Comparative table: Phacoemulsification vs MSICS vs ECCE (Incision size, astigmatism, sutures, recovery)"
                ]
              },
              mnemonic: {
                title: "Causes of Complicated Cataract",
                letters: [
                  { letter: "U", description: "Uveitis (anterior / intermediate)" },
                  { letter: "R", description: "Retinitis pigmentosa" },
                  { letter: "G", description: "Glaucoma (absolute)" },
                  { letter: "E", description: "Endophthalmitis" },
                  { letter: "D", description: "Detachment (Retinal detachment)" }
                ],
                explanation: "'URGED' describes ocular pathology giving rise to complicated cataracts with 'polychromatic luster'."
              }
            }
          }
        ]
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Final Year MBBS (Part 2)',
    phase: 'Major Clinical Phase',
    duration: '12 Months (Medicine, Surgery, OBGYN, Paediatrics)',
    subjects: [
      {
        id: 'med-401',
        name: 'General Medicine',
        code: 'MED-IV',
        paperTitle: 'Internal Medicine, Cardiology, Neurology, Nephrology, Endocrinology & Infectious Diseases',
        qSize: '6.8 MB',
        aSize: '5.5 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'med-dka',
            title: 'Diabetic Ketoacidosis (DKA) - Pathogenesis, Diagnostic Triad & Management Protocol',
            subject: 'General Medicine',
            year: '4',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            diagramType: 'dka-protocol',
            answers: {
              mark2: {
                definition: "DKA is an acute, life-threatening metabolic crisis characterized by the biochemical triad of: Hyperglycemia (>200 mg/dL), Ketosis (high urine/serum ketones), and High-anion-gap metabolic acidosis (pH <7.3, HCO3 <18 mEq/L).",
                keyPoints: [
                  "Precipitating causes (the 5 I's): Infection, Infarction, Insulin omission, Indiscretion, Infant (pregnancy).",
                  "Classic clinical sign: Kussmaul deep, rapid breathing with fruity acetone odor."
                ],
                clinicalPearls: "Never start insulin if serum Potassium is below 3.3 mEq/L; replenish potassium first to prevent fatal hypokalemic arrhythmias."
              },
              mark5: {
                heading: "Fluid & Electrolyte Replacement Protocol in DKA",
                introduction: "Adult patients in DKA have an average fluid deficit of 5 to 6 Liters and severe total body potassium depletion.",
                etiologyOrPathology: "Hour 1: 0.9% Normal Saline at 1000 mL/hr. Subsequent hours: 250-500 mL/hr guided by hemodynamics and corrected serum sodium. When blood glucose drops to <=250 mg/dL, switch to 5% Dextrose with 0.45% Saline to prevent hypoglycemia while insulin continues until the anion gap closes.",
                clinicalFeatures: [
                  "Severe dehydration, dry tongue, tachycardia, hypotension, nausea, abdominal pain mimicking an acute abdomen."
                ],
                investigations: ["Arterial Blood Gas (ABG)", "Serum Ketones (Beta-hydroxybutyrate is gold standard)", "Serum Electrolytes & Anion Gap calculation"],
                treatmentSummary: "IV regular insulin infusion at 0.1 U/kg/hr alongside potassium repletion (20-30 mEq per liter of IV fluid once K+ <5.2).",
                diagramSuggestion: "Draw clinical algorithm chart illustrating fluids, insulin titration, and potassium monitoring criteria."
              },
              mark10: {
                goldStandardTitle: "Diabetic Ketoacidosis vs HHS: Pathophysiology, Osmolar Shifts, Bedside Protocol & Resolution Criteria",
                introAndDefinition: "DKA is primarily seen in Type 1 Diabetes Mellitus due to absolute insulin deficiency, though it can occur in severe stress in Type 2 DM.",
                classificationOrAnatomy: [
                  "Mild DKA: Arterial pH 7.25-7.30, HCO3 15-18, Alert mental status.",
                  "Moderate DKA: Arterial pH 7.00-7.24, HCO3 10-<15, Drowsy.",
                  "Severe DKA: Arterial pH <7.00, HCO3 <10, Stupor or Coma.",
                  "Contrast with Hyperosmolar Hyperglycemic State (HHS): Blood glucose >600 mg/dL, serum osmolality >320 mOsm/kg, pH >7.30, absent significant ketoacidosis."
                ],
                pathophysiologySteps: [
                  "Absolute insulin deficiency + Counter-regulatory hormone surge (Glucagon, Cortisol, Epinephrine, GH).",
                  "Unchecked lipolysis releases Free Fatty Acids (FFAs) transported to the liver via Carnitine Palmitoyl Transferase-1 (CPT-1).",
                  "Accelerated hepatic beta-oxidation generates Acetoacetate and Beta-hydroxybutyrate.",
                  "Accumulation of ketoacids consumes bicarbonate buffer -> high anion gap metabolic acidosis."
                ],
                clinicalManifestations: [
                  "Polyuria, polydipsia, weight loss, generalized weakness, Kussmaul respirations, altered sensorium, hypothermia."
                ],
                diagnosticWorkup: {
                  goldStandard: "Serum Beta-hydroxybutyrate levels (>3.0 mmol/L) & ABG demonstrating anion gap >12",
                  routineLabs: ["Plasma Glucose", "Urea & Creatinine (prerenal azotemia)", "Urine ketones (nitroprusside test detects only acetoacetate)"],
                  imaging: ["Chest X-ray and ECG to detect underlying precipitating infection or myocardial infarction"]
                },
                stagingOrScoring: "Anion Gap formula: Na - (Cl + HCO3). Normal = 8 to 12 mEq/L.",
                comprehensiveManagement: {
                  emergency: "Airway protection if Glasgow Coma Scale <=8; wide-bore IV access; 1L Normal Saline in first 30-60 minutes.",
                  medicalTherapy: [
                    "Insulin: IV regular insulin 0.14 U/kg/hr infusion (target glucose drop: 50-75 mg/dL per hour).",
                    "Potassium: Add 20-30 mEq KCL to each liter of IV fluid once urine output >0.5 mL/kg/hr and K+ <5.2 mEq/L.",
                    "Bicarbonate therapy: Indicated ONLY if arterial pH <6.9 (100 mmol sodium bicarbonate in 400 mL sterile water with 20 mEq KCl over 2 hours).",
                    "Resolution Criteria: Blood glucose <200 mg/dL AND two of: serum bicarbonate >=15 mEq/L, venous pH >7.3, anion gap <=12 mEq/L."
                  ],
                  surgicalOrDefinitive: ["Overlap subcutaneous basal insulin 2 hours prior to stopping the IV insulin infusion to prevent rebound ketoacidosis."]
                },
                complications: ["Cerebral edema (especially in pediatric patients receiving overly rapid hypotonic fluids)", "Severe hypokalemia", "Aspiration pneumonia", "Rhino-cerebral Mucormycosis"],
                topperFlowchart: "Insulin Deficit -> Lipolysis (FFAs) -> CPT-1 Up-regulation -> Hepatic Ketogenesis -> Acidosis + Osmotic Diuresis -> Shock",
                diagramChecklist: [
                  "Biochemical pathway of lipolysis to Acetoacetate and Beta-hydroxybutyrate",
                  "Comparative table: DKA vs HHS (Glucose, pH, Ketones, Osmolality, Mortality)",
                  "Fluid and potassium infusion titration timeline"
                ]
              },
              mnemonic: {
                title: "Precipitating Causes of DKA (The 5 I's)",
                letters: [
                  { letter: "I", description: "Infection (Pneumonia, UTI, Sepsis)" },
                  { letter: "I", description: "Ischemia / Infarction (Myocardial, Mesenteric, Stroke)" },
                  { letter: "I", description: "Inadequate Insulin (Non-compliance or pump failure)" },
                  { letter: "I", description: "Intoxication / Drugs (Alcohol, Cocaine, SGLT2i)" },
                  { letter: "I", description: "Iatrogenic (Steroids, Thiazides)" }
                ],
                explanation: "'The 5 I's' trigger acute ketoacidosis."
              }
            }
          }
        ]
      },
      {
        id: 'surg-402',
        name: 'General Surgery',
        code: 'SURG-IV',
        paperTitle: 'General Surgery, Gastrointestinal, Urology, Oncology, Trauma & Orthopaedics',
        qSize: '6.4 MB',
        aSize: '5.1 MB',
        examDuration: '3 Hours',
        totalMarks: 100,
        topics: [
          {
            id: 'surg-hernia',
            title: 'Inguinal Hernia - Surgical Anatomy, Direct vs Indirect & Lichtenstein Tension-Free Repair',
            subject: 'General Surgery',
            year: '4',
            frequency: 'Repeated 5+ Years',
            examWeight: '10-Mark Essay',
            diagramType: 'inguinal-hernia',
            answers: {
              mark2: {
                definition: "An inguinal hernia is a protrusion of abdominal contents through an abnormal opening in the inguinal region of the anterior abdominal wall.",
                keyPoints: [
                  "Indirect hernia enters through the deep inguinal ring (lateral to inferior epigastric vessels).",
                  "Direct hernia protrudes through Hesselbach's triangle (medial to inferior epigastric vessels)."
                ],
                clinicalPearls: "The Internal Ring Occlusion Test differentiates direct from indirect: after reducing the hernia and occluding the deep ring (1.25 cm above midinguinal point), impulse on coughing indicates a direct hernia."
              },
              mark5: {
                heading: "Boundaries of Hesselbach's Triangle & Surgical Anatomy",
                introduction: "Hesselbach's triangle represents an area of potential weakness in the posterior wall of the inguinal canal.",
                etiologyOrPathology: "Boundaries: Medial - Lateral border of Rectus abdominis muscle; Lateral - Inferior epigastric vessels; Inferior - Inguinal ligament (Poupart's ligament). Floor is formed by Fascia transversalis reinforced medially by the conjoint tendon.",
                clinicalFeatures: [
                  "Direct hernia is common in elderly males due to weakness of abdominal muscles; rarely strangulates due to wide neck."
                ],
                investigations: ["Clinical physical examination in standing position", "High-frequency Ultrasound / CT scan if diagnosis ambiguous"],
                treatmentSummary: "Lichtenstein tension-free mesh hernioplasty using polypropylene mesh.",
                diagramSuggestion: "Draw triangular schematic with labeled inferior epigastric vessels, rectus border, and inguinal ligament."
              },
              mark10: {
                goldStandardTitle: "Inguinal Hernia: Comparative Anatomy, Hernioplasty vs Laparoscopic (TAPP/TEP) Techniques & Complications",
                introAndDefinition: "Inguinal hernias constitute 75% of all abdominal wall hernias. Lifetime risk is 27% in males and 3% in females.",
                classificationOrAnatomy: [
                  "Inguinal Canal: 4 cm long oblique canal directed downwards, forwards, and medially.",
                  "Anterior Wall: External oblique aponeurosis (and internal oblique in lateral third).",
                  "Posterior Wall: Fascia transversalis (and conjoint tendon in medial third).",
                  "Roof: Arched lower fibers of Internal Oblique and Transversus abdominis.",
                  "Floor: Grooved upper surface of Inguinal Ligament, reinforced medially by Lacunar ligament.",
                  "Contents: Spermatic cord in males, Round ligament in females, Ilioinguinal nerve."
                ],
                pathophysiologySteps: [
                  "Indirect: Failure of obliteration of the processus vaginalis (patent processus vaginalis).",
                  "Direct: Acquired wear-and-tear weakness of fascia transversalis due to chronic elevated intra-abdominal pressure (BPH, chronic cough, constipation)."
                ],
                clinicalManifestations: [
                  "Painless groin swelling that increases on standing/straining and reduces on lying down.",
                  "Strangulation signs: Irreducible tender mass, overlying erythema, tachycardia, vomiting, absolute constipation."
                ],
                diagnosticWorkup: {
                  goldStandard: "Clinical Diagnosis (Cough impulse, deep ring occlusion test, Zieman's 3-finger test)",
                  routineLabs: ["CBC, Coagulation profile, Renal panel prior to elective surgery"],
                  imaging: ["Dynamic ultrasound showing peristalsis or omental tissue sliding through the defect"]
                },
                stagingOrScoring: "Nyhus Classification (Types I through IV).",
                comprehensiveManagement: {
                  emergency: "Strangulated Hernia: Immediate resuscitation, emergency laparotomy/groin exploration; DO NOT attempt taxis or manual reduction.",
                  medicalTherapy: ["Truss is only for high-risk elderly patients unfit for any anesthesia."],
                  surgicalOrDefinitive: [
                    "Lichtenstein Mesh Hernioplasty (Gold Standard Open): 7.5 x 15 cm Polypropylene mesh fixed to conjoint tendon and inguinal ligament, creating a new internal ring.",
                    "Laparoscopic Repairs: TEP (Totally Extraperitoneal) or TAPP (Transabdominal Preperitoneal) repair; preferred for bilateral and recurrent hernias."
                  ]
                },
                complications: ["Chronic groin pain / Inguiodynia (damage to ilioinguinal/genitofemoral nerve)", "Ischemic orchitis / testicular atrophy", "Wound hematoma", "Hernia recurrence (<1%)"],
                topperFlowchart: "Incision -> Open External Oblique -> Isolate Cord -> Dissect Sac -> Reduce Contents -> Lichtenstein Mesh Fixation -> Layered Closure",
                diagramChecklist: [
                  "Inguinal canal cross-section showing Anterior, Posterior, Roof, and Floor boundaries",
                  "Hesselbach's triangle with inferior epigastric artery relation",
                  "Lichtenstein mesh position with spermatic cord emerging through slit"
                ]
              },
              mnemonic: {
                title: "Coverings of Spermatic Cord & Abdominal Wall Origin",
                letters: [
                  { letter: "I", description: "Internal Spermatic Fascia (from Transversalis fascia)" },
                  { letter: "C", description: "Cremasteric Muscle & Fascia (from Internal Oblique)" },
                  { letter: "E", description: "External Spermatic Fascia (from External Oblique aponeurosis)" }
                ],
                explanation: "'I-C-E' inside out: Transversalis, Internal Oblique, External Oblique."
              }
            }
          }
        ]
      }
    ]
  }
};

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    subject: 'Human Anatomy',
    year: '1',
    question: 'Injury to the upper trunk of the brachial plexus at Erb’s point typically results in which characteristic posture?',
    options: ["Claw hand deformity", "Waiter's tip / Policeman's tip hand", "Wrist drop", "Ape thumb deformity"],
    correctIndex: 1,
    explanation: "Erb's palsy (C5-C6 lesion) causes paralysis of abductors and lateral rotators of shoulder, flexors and supinators of forearm. The limb hangs in adduction, medial rotation, extended elbow, and pronated forearm ('Waiter's tip hand').",
    highYieldTip: "Klumpke's palsy (C8-T1 lower trunk) produces true claw hand (Klumpke = Claw)."
  },
  {
    id: 'q2',
    subject: 'Human Physiology',
    year: '1',
    question: 'Which phase of the cardiac ventricular action potential is primarily responsible for the prolonged plateau and prevention of tetanic contraction?',
    options: ["Phase 0 fast Na+ influx", "Phase 1 transient outward K+ current", "Phase 2 L-type Ca2+ influx balanced by delayed K+ efflux", "Phase 3 rapid repolarization"],
    correctIndex: 2,
    explanation: "Phase 2 plateau is mediated by inward calcium current through slow L-type Ca2+ channels balanced by outward potassium channels. This prolongs the refractory period.",
    highYieldTip: "The long plateau ensures the heart relaxes and refills with blood before the next contraction."
  },
  {
    id: 'q3',
    subject: 'Pathology',
    year: '2',
    question: 'Which test reliably differentiates Chronic Myeloid Leukemia (CML) from a benign Leukemoid Reaction?',
    options: ["Total Leukocyte Count (TLC)", "Leukocyte Alkaline Phosphatase (LAP) score", "Platelet count", "Bone marrow cellularity"],
    correctIndex: 1,
    explanation: "The LAP score is decreased (often 0) in CML due to defective leukocyte enzyme maturation, whereas it is markedly elevated (>100) in reactive leukemoid states.",
    highYieldTip: "CML also has the t(9;22) Philadelphia chromosome and absolute basophilia."
  },
  {
    id: 'q4',
    subject: 'Pharmacology',
    year: '2',
    question: 'When switching a patient from an ACE inhibitor (e.g., Enalapril) to an ARNI (Sacubitril/Valsartan), what is the mandatory washout period required to prevent angioedema?',
    options: ["12 hours", "24 hours", "36 hours", "72 hours"],
    correctIndex: 2,
    explanation: "A minimum of 36 hours washout period is mandatory because both drugs inhibit bradykinin breakdown; combined inhibition causes dangerous bradykinin accumulation and angioedema.",
    highYieldTip: "ARNI combines neprilysin inhibitor (Sacubitril) + AT1 receptor blocker (Valsartan)."
  },
  {
    id: 'q5',
    subject: 'General Medicine',
    year: '4',
    question: 'In a patient presenting with severe Diabetic Ketoacidosis (DKA), which of the following is an absolute indication to DELAY insulin initiation?',
    options: ["Blood glucose > 600 mg/dL", "Serum Potassium < 3.3 mEq/L", "Arterial pH < 7.00", "Serum Bicarbonate < 10 mEq/L"],
    correctIndex: 1,
    explanation: "Insulin drives potassium into cells. Starting insulin when serum K+ is <3.3 mEq/L can cause fatal hypokalemic cardiac arrhythmias or respiratory muscle arrest. Potassium must be replenished first.",
    highYieldTip: "Target potassium range during DKA resuscitation is 4.0 - 5.0 mEq/L."
  },
  {
    id: 'q6',
    subject: 'General Surgery',
    year: '4',
    question: 'In surgical anatomy of an inguinal hernia, what anatomical structure forms the LATERAL boundary of Hesselbach’s triangle?',
    options: ["Inguinal ligament", "Inferior epigastric vessels", "Lateral border of Rectus abdominis", "Conjoint tendon"],
    correctIndex: 1,
    explanation: "Hesselbach's triangle boundaries: Medial = Rectus abdominis; Lateral = Inferior epigastric vessels; Inferior = Inguinal ligament. Direct hernias push through this triangle.",
    highYieldTip: "Indirect hernia enters lateral to the inferior epigastric artery through the deep ring."
  }
];

export const TOPPER_EXAM_STRATEGIES = [
  {
    title: "The 1.8 Minutes Per Mark Rule",
    summary: "University exams grant 180 minutes for 100 marks. Maintain strict time limits so you never leave high-scoring questions unanswered.",
    bullets: [
      "10-Mark Long Essay: Exactly 18 minutes (Spend 2 mins planning headings, 12 mins structured writing, 4 mins diagrams).",
      "5-Mark Brief Answer: Exactly 9 minutes (Focus on definition, classification flowchart, and 1 clinical diagram).",
      "2-Mark Short Question: Exactly 3.5 minutes (Bullet points only, 1 line definition, key diagnostic criteria, no lengthy intro).",
      "Buffer: 10 minutes at the end for reviewing missed question numbers and underlining clinical keywords."
    ]
  },
  {
    title: "The 3-Color Diagram Presentation Technique",
    summary: "Examiners evaluate 50+ papers a day. Clean, legible diagrams grab full marks before a single sentence is read.",
    bullets: [
      "Blue Pen: Standard prose and descriptions.",
      "Black Pen: Heading banners, bold clinical terms, and diagram frame lines.",
      "Red / Pencil: Highlight vessels (Arteries Red, Veins Blue, Nerves Yellow) or pathology histological borders.",
      "Always draw diagrams on the top half of the right-hand answer sheet page; label all structures with straight horizontal leader lines."
    ]
  },
  {
    title: "Universal Clinical Essay Framework (Gold Medal Standard)",
    summary: "Every 10-mark clinical question across Medicine, Surgery, and OBGYN must follow this 8-step sequence:",
    bullets: [
      "1. Definition & Consensus Criteria (WHO / Gold Standard Definition).",
      "2. Surgical Anatomy / Pathophysiological Cascade with flowcharts.",
      "3. Etiology & Risk Factors (Categorized into Congenital vs Acquired).",
      "4. Clinical Presentation (Symptoms, Physical Signs, Pathognomonic clinical tests).",
      "5. Diagnostic Workup (Gold Standard test first, then routine labs and imaging).",
      "6. Staging / Risk Stratification (TNM, Child-Pugh, NYHA, etc.).",
      "7. Management Protocol (Emergency Resuscitation -> Medical Therapy -> Definitive Surgery).",
      "8. Complications & Prognostic Pearl."
    ]
  }
];
