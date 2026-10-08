export interface PlanningScenario {
  id: string;
  title: string;
  investigationBrief: string;
  givenEquation: string;
  constantsToDetermine: string;
  diagramDescription: string;
  svgDiagram: string;
  independentVariable: {
    name: string;
    symbol: string;
    units: string;
    howVaried: string;
  };
  dependentVariable: {
    name: string;
    symbol: string;
    units: string;
    howMeasured: string;
    instrument: string;
  };
  controlledVariables: {
    variable: string;
    howControlled: string;
  }[];
  methodOfAnalysis: {
    linearizedEquation: string;
    graphYAxis: string;
    graphXAxis: string;
    gradientExpression: string;
    yInterceptExpression: string;
    constantDetermination: string;
  };
  safetyRequirement: {
    hazard: string;
    risk: string;
    precaution: string;
    unacceptableGeneralization: string;
  };
  additionalDetailPoints: {
    category: string;
    point: string;
    whyRequired: string;
  }[];
}

export interface AnalysisDataRow {
  index: number;
  rawX: number; // e.g. mass m / kg
  rawY: number; // e.g. period T / s
  uncertY: number; // e.g. +- 0.05 s
  calcX: number; // e.g. m^1/2
  calcY: number; // e.g. T^2 / s^2
  calcUncertY: number; // absolute uncertainty
}

export interface AnalysisScenario {
  id: string;
  title: string;
  context: string;
  relationshipEquation: string;
  constantsToFind: string;
  tableData: AnalysisDataRow[];
  tableHeaders: {
    rawX: string;
    rawY: string;
    calcX: string;
    calcY: string;
    calcUncertY: string;
  };
  sfRuleExplanation: string;
  bestFitGradient: number;
  worstFitGradient: number;
  bestFitIntercept: number;
  worstFitIntercept: number;
  finalTargetConstant: {
    symbol: string;
    expression: string;
    bestValue: number;
    uncertainty: number;
    unit: string;
  };
}

export const PLANNING_SCENARIOS: PlanningScenario[] = [
  {
    id: 'plan_wire_standing_wave',
    title: 'Standing Waves on a Stretched Wire (Frequency vs Tension)',
    investigationBrief:
      'A student is investigating stationary waves on a stretched steel wire of length L and mass per unit length μ. It is suggested that the fundamental resonant frequency f of the wire is related to tension T by the relationship f = k Tⁿ where k and n are constants. Design a laboratory experiment to test this relationship and determine values for k and n.',
    givenEquation: 'f = k T^n',
    constantsToDetermine: 'k and n',
    diagramDescription:
      'Stretched wire between vibration generator and pulley with slotted masses. Signal generator connected to vibration generator, wooden bridges defining length L.',
    svgDiagram: `<svg viewBox="0 0 600 240" class="w-full h-auto bg-slate-950 rounded-lg p-2">
      <!-- Pulley and table -->
      <line x1="40" y1="180" x2="520" y2="180" stroke="#475569" stroke-width="6"/>
      <circle cx="510" cy="180" r="14" fill="#64748b"/>
      <!-- Wire -->
      <line x1="80" y1="150" x2="510" y2="166" stroke="#38bdf8" stroke-width="2.5"/>
      <line x1="524" y1="180" x2="524" y2="225" stroke="#38bdf8" stroke-width="2.5"/>
      <!-- Slotted masses -->
      <rect x="514" y="215" width="20" height="20" fill="#f59e0b" rx="2"/>
      <text x="540" y="228" fill="#f59e0b" font-size="11" font-family="sans-serif">Masses (T = mg)</text>
      <!-- Vibration generator -->
      <rect x="70" y="140" width="30" height="35" fill="#0284c7" rx="3"/>
      <text x="50" y="130" fill="#38bdf8" font-size="11" font-family="sans-serif">Vibration Generator</text>
      <!-- Signal Generator -->
      <rect x="60" y="50" width="100" height="45" fill="#1e293b" stroke="#38bdf8" rx="4"/>
      <text x="75" y="75" fill="#f8fafc" font-size="11" font-family="sans-serif">Signal Gen (f)</text>
      <!-- Bridges -->
      <polygon points="170,180 180,150 190,180" fill="#e2e8f0"/>
      <polygon points="430,180 440,150 450,180" fill="#e2e8f0"/>
      <!-- Dimension arrow for L -->
      <line x1="180" y1="135" x2="440" y2="135" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="290" y="130" fill="#10b981" font-size="12" font-family="sans-serif">Length L (Metre rule)</text>
    </svg>`,
    independentVariable: {
      name: 'Tension in the wire',
      symbol: 'T',
      units: 'N',
      howVaried:
        'Vary the tension T by adding slotted masses m to the mass hanger suspended over the pulley, where T = mg (at least 6 different masses).',
    },
    dependentVariable: {
      name: 'Resonant fundamental frequency',
      symbol: 'f',
      units: 'Hz',
      howMeasured:
        'Adjust signal generator frequency until a stationary wave with a single loop (antinode at centre, nodes at bridges) reaches maximum amplitude.',
      instrument:
        'Calibrated signal generator (read directly from digital display or measure period on oscilloscope).',
    },
    controlledVariables: [
      {
        variable: 'Vibrating length of wire L',
        howControlled:
          'Keep position of the two wooden triangular bridges fixed; measure L using a metre rule with millimeter precision.',
      },
      {
        variable: 'Mass per unit length of wire μ',
        howControlled:
          'Use the exact same continuous strand of wire throughout the experiment without cutting or replacing.',
      },
    ],
    methodOfAnalysis: {
      linearizedEquation: 'ln(f) = n ln(T) + ln(k)',
      graphYAxis: 'ln(f)',
      graphXAxis: 'ln(T)',
      gradientExpression: 'gradient = n',
      yInterceptExpression: 'y-intercept = ln(k)',
      constantDetermination:
        'n is determined directly from the gradient of the best-fit line. k is determined from k = e^(y-intercept).',
    },
    safetyRequirement: {
      hazard: 'Stretched wire under high mechanical tension',
      risk: 'Wire could snap unexpectedly and cause eye injury or facial lacerations',
      precaution:
        'Wear safety goggles and place a protective transparent screen / cushion beneath the suspended masses; do not stand directly in line with the stretched wire.',
      unacceptableGeneralization:
        "Writing 'be careful with masses' or 'wear lab coat' is awarded 0 marks in Paper 5.",
    },
    additionalDetailPoints: [
      {
        category: 'Apparatus detail',
        point:
          'Measure mass m of slotted masses using a top-pan balance with ±0.01 g precision rather than relying on stamped values.',
        whyRequired: 'Eliminates systematic zero or calibration errors in masses.',
      },
      {
        category: 'Apparatus detail',
        point:
          'Determine mass per unit length μ by measuring mass of known 1.0 m wire sample on top-pan balance and diameter with micrometer screw gauge.',
        whyRequired: 'Confirms wire uniformity.',
      },
      {
        category: 'Measurement precision',
        point:
          'Check that the waveform is indeed the fundamental frequency (one loop, 1 antinode, 2 nodes at bridges) and not a higher harmonic.',
        whyRequired: 'Prevents confusing n=1 mode with higher modes.',
      },
      {
        category: 'Reduction of uncertainty',
        point:
          'Approach resonance frequency from both higher and lower frequencies to determine the exact peak with minimum uncertainty.',
        whyRequired: 'Reduces subjective visual error in finding resonance.',
      },
      {
        category: 'Mechanical stability',
        point:
          'Use low-friction pulley and ensure string/wire does not touch edge of bench.',
        whyRequired: 'Ensures tension in horizontal wire strictly equals mg.',
      },
      {
        category: 'Elastic limit',
        point:
          'Ensure the maximum tension applied does not exceed the elastic limit of the steel wire.',
        whyRequired: 'Prevents plastic deformation altering μ.',
      },
    ],
  },
  {
    id: 'plan_solenoid_magnetic_field',
    title: 'Magnetic Flux Density of a Solenoid (Hall Probe Investigation)',
    investigationBrief:
      'A student suggests that the magnetic flux density B at the centre of a long solenoid depends on the current I according to B = c Iⁿ where c and n are constants. Design an experiment using a calibrated Hall probe to investigate this relationship and determine c and n.',
    givenEquation: 'B = c I^n',
    constantsToDetermine: 'c and n',
    diagramDescription:
      'Solenoid connected to DC power supply, ammeter, and rheostat. Calibrated Hall probe clamped inside centre of solenoid connected to millivoltmeter.',
    svgDiagram: `<svg viewBox="0 0 600 240" class="w-full h-auto bg-slate-950 rounded-lg p-2">
      <!-- Solenoid coils -->
      <rect x="180" y="80" width="240" height="80" fill="none" stroke="#64748b" stroke-width="2" rx="4"/>
      <!-- Coil loops -->
      <path d="M 200,80 Q 215,60 230,80 Q 245,100 230,160 Q 215,180 200,160 Z" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <path d="M 260,80 Q 275,60 290,80 Q 305,100 290,160 Q 275,180 260,160 Z" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <path d="M 320,80 Q 335,60 350,80 Q 365,100 350,160 Q 335,180 320,160 Z" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <path d="M 380,80 Q 395,60 410,80 Q 425,100 410,160 Q 395,180 380,160 Z" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <!-- Hall Probe -->
      <rect x="250" y="115" width="120" height="12" fill="#0284c7" rx="2"/>
      <text x="270" y="110" fill="#38bdf8" font-size="11" font-family="sans-serif">Hall Probe at centre</text>
      <!-- Millivoltmeter for Hall probe -->
      <rect x="420" y="40" width="90" height="40" fill="#1e293b" stroke="#38bdf8" rx="3"/>
      <text x="430" y="65" fill="#f8fafc" font-size="11" font-family="sans-serif">mV meter (V_H)</text>
      <!-- DC Circuit -->
      <line x1="180" y1="120" x2="100" y2="120" stroke="#f59e0b" stroke-width="2"/>
      <line x1="100" y1="120" x2="100" y2="210" stroke="#f59e0b" stroke-width="2"/>
      <rect x="70" y="195" width="60" height="30" fill="#1e293b" stroke="#f59e0b" rx="2"/>
      <text x="80" y="215" fill="#f8fafc" font-size="11" font-family="sans-serif">DC Supply</text>
      <rect x="230" y="195" width="50" height="30" fill="#1e293b" stroke="#10b981" rx="2"/>
      <text x="240" y="215" fill="#10b981" font-size="11" font-family="sans-serif">Ammeter</text>
      <rect x="350" y="195" width="70" height="30" fill="#1e293b" stroke="#f59e0b" rx="2"/>
      <text x="360" y="215" fill="#f8fafc" font-size="11" font-family="sans-serif">Rheostat</text>
      <line x1="130" y1="210" x2="230" y2="210" stroke="#f59e0b" stroke-width="2"/>
      <line x1="280" y1="210" x2="350" y2="210" stroke="#f59e0b" stroke-width="2"/>
      <line x1="420" y1="210" x2="420" y2="120" stroke="#f59e0b" stroke-width="2"/>
    </svg>`,
    independentVariable: {
      name: 'Current in the solenoid',
      symbol: 'I',
      units: 'A',
      howVaried:
        'Vary the variable resistor (rheostat) or variable DC power supply voltage to obtain at least 6 different current values measured by digital ammeter.',
    },
    dependentVariable: {
      name: 'Magnetic flux density',
      symbol: 'B',
      units: 'T',
      howMeasured:
        'Read Hall voltage V_H on calibrated millivoltmeter and convert to B using manufacturer calibration constant (or direct Tesla meter).',
      instrument: 'Calibrated Hall probe and digital millivoltmeter / Tesla meter.',
    },
    controlledVariables: [
      {
        variable: 'Position and orientation of Hall probe',
        howControlled:
          'Clamp the Hall probe rigidly so the probe face is perpendicular to solenoid axis and located at the exact centre along the length.',
      },
      {
        variable: 'Number of turns per unit length n',
        howControlled:
          'Keep the solenoid fixed in length and number of turns throughout all trials.',
      },
    ],
    methodOfAnalysis: {
      linearizedEquation: 'ln(B) = n ln(I) + ln(c)',
      graphYAxis: 'ln(B)',
      graphXAxis: 'ln(I)',
      gradientExpression: 'gradient = n',
      yInterceptExpression: 'y-intercept = ln(c)',
      constantDetermination:
        'Constant n equals the gradient of the straight line. Constant c is determined from c = e^(y-intercept).',
    },
    safetyRequirement: {
      hazard: 'High electrical current flowing through solenoid coils over time',
      risk: 'Coils become hot and cause skin burns upon contact',
      precaution:
        'Switch off circuit between measurements to allow cooling; avoid touching bare copper coils with bare hands; use insulated wire.',
      unacceptableGeneralization:
        "Writing 'electric shock' for low DC voltage (e.g. 12V) is rejected by examiners. Must specify heating hazard.",
    },
    additionalDetailPoints: [
      {
        category: 'Background subtraction',
        point:
          "Zero the Hall probe or record the Earth's background magnetic flux density with zero solenoid current and subtract from all subsequent readings.",
        whyRequired: "Eliminates Earth's magnetic field and stray laboratory fields.",
      },
      {
        category: 'Probe orientation',
        point:
          'Rotate the Hall probe until maximum Hall voltage is registered to ensure probe surface is perpendicular to field lines.',
        whyRequired: 'Hall voltage is proportional to cos(θ); max voltage ensures θ = 0.',
      },
      {
        category: 'Heating prevention',
        point:
          'Use a switch in the circuit and only close for short periods while taking readings to prevent heating altering resistance.',
        whyRequired: 'Temperature coefficient of resistance would cause current drift.',
      },
      {
        category: 'Ammeter precision',
        point:
          'Use a digital multimeter on 10 A or 2 A DC range with 0.01 A precision.',
        whyRequired: 'Ensures high precision in current measurements.',
      },
    ],
  },
];

export const ANALYSIS_SCENARIOS: AnalysisScenario[] = [
  {
    id: 'ana_capacitor_discharge',
    title: 'Paper 5 Q2: Capacitor Discharge through Resistor',
    context:
      'A student investigates the discharge of a capacitor through a fixed resistor R = 82 kΩ. The potential difference V across the capacitor is measured at various times t. The relationship is suggested to be V = V₀ e^(-t / RC).',
    relationshipEquation: 'V = V₀ e^(-t / RC)',
    constantsToFind: 'C (Capacitance) and V₀ (Initial potential difference)',
    sfRuleExplanation:
      'Values of ln(V) must have the number of decimal places corresponding to the number of significant figures in V (V is given to 2 s.f., so ln(V) must be 2 or 3 decimal places). Absolute uncertainty Δln(V) = ΔV / V.',
    tableHeaders: {
      rawX: 't / s',
      rawY: 'V / V',
      calcX: 't / s',
      calcY: 'ln(V)',
      calcUncertY: '± Δln(V)',
    },
    tableData: [
      { index: 1, rawX: 10, rawY: 8.8, uncertY: 0.2, calcX: 10, calcY: 2.175, calcUncertY: 0.023 },
      { index: 2, rawX: 20, rawY: 7.2, uncertY: 0.2, calcX: 20, calcY: 1.974, calcUncertY: 0.028 },
      { index: 3, rawX: 30, rawY: 5.9, uncertY: 0.2, calcX: 30, calcY: 1.775, calcUncertY: 0.034 },
      { index: 4, rawX: 40, rawY: 4.8, uncertY: 0.2, calcX: 40, calcY: 1.569, calcUncertY: 0.042 },
      { index: 5, rawX: 50, rawY: 3.9, uncertY: 0.2, calcX: 50, calcY: 1.361, calcUncertY: 0.051 },
      { index: 6, rawX: 60, rawY: 3.2, uncertY: 0.2, calcX: 60, calcY: 1.163, calcUncertY: 0.063 },
    ],
    bestFitGradient: -0.0202,
    worstFitGradient: -0.0215,
    bestFitIntercept: 2.378,
    worstFitIntercept: 2.422,
    finalTargetConstant: {
      symbol: 'C',
      expression: 'C = -1 / (m × R)',
      bestValue: 6.04e-4, // ~604 μF
      uncertainty: 0.39e-4,
      unit: 'F',
    },
  },
];
