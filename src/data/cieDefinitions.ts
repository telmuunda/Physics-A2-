export interface CIEDefinition {
  id: string;
  topic: string;
  term: string;
  marks: number;
  verbatimMarkScheme: string;
  requiredKeywords: string[][]; // Each array is an OR group of required synonyms
  examinerReportWarning: string;
  pastPaperRef: string;
  sampleAcceptableAnswer: string;
}

export const CIE_A2_DEFINITIONS: CIEDefinition[] = [
  // --- TOPIC 1: Gravitational Fields ---
  {
    id: 'grav_newtons_law',
    topic: 'Gravitational Fields',
    term: "Newton's Law of Gravitation",
    marks: 2,
    verbatimMarkScheme:
      'Gravitational force between two point masses is directly proportional to the product of their masses [B1] and inversely proportional to the square of their separation [B1].',
    requiredKeywords: [
      ['point masses', 'point mass', 'two point masses', 'spherical masses'],
      ['force', 'gravitational force'],
      ['directly proportional', 'proportional'],
      ['product of', 'product of masses', 'product of their masses', 'masses multiplied'],
      ['inversely proportional', 'inverse of'],
      ['square of', 'squared separation', 'square of their separation', 'distance squared', 'separation squared'],
    ],
    examinerReportWarning:
      "Candidates frequently omit 'point masses' and just say 'two objects' or 'two bodies', which loses the first B1 mark. Also, stating 'distance' instead of 'separation' or omitting 'square' is a common fatal error.",
    pastPaperRef: '9702/42/M/J/22 Q1(a)',
    sampleAcceptableAnswer:
      'The gravitational force of attraction between two point masses is directly proportional to the product of their masses and inversely proportional to the square of their separation.',
  },
  {
    id: 'grav_field_strength',
    topic: 'Gravitational Fields',
    term: 'Gravitational Field Strength (g)',
    marks: 1,
    verbatimMarkScheme:
      'Gravitational force per unit mass [B1] acting on a small / point mass.',
    requiredKeywords: [
      ['force per unit mass', 'gravitational force per unit mass', 'force per mass'],
      ['unit mass', 'point mass', 'small test mass'],
    ],
    examinerReportWarning:
      "Never say 'force on a mass'. The exact phrase 'force per unit mass' is essential. Candidates writing 'acceleration of free fall' when asked for the definition of field strength are awarded 0 marks.",
    pastPaperRef: '9702/41/O/N/21 Q1(a)',
    sampleAcceptableAnswer:
      'Gravitational force exerted per unit mass on a small point mass at that point in the field.',
  },
  {
    id: 'grav_potential',
    topic: 'Gravitational Fields',
    term: 'Gravitational Potential (φ or Vg)',
    marks: 2,
    verbatimMarkScheme:
      'Work done per unit mass [B1] in bringing a small test mass from infinity to the point [B1].',
    requiredKeywords: [
      ['work done per unit mass', 'work done per mass', 'energy per unit mass'],
      ['from infinity', 'from infinity to the point', 'infinity to that point'],
    ],
    examinerReportWarning:
      "Candidates often write 'work done to move an object' (missing 'per unit mass') or omit 'from infinity'. Saying 'energy needed to move' is rejected unless clearly stated as work done per unit mass.",
    pastPaperRef: '9702/42/F/M/23 Q1(a)',
    sampleAcceptableAnswer:
      'Work done per unit mass in bringing a point mass from infinity to the point.',
  },
  {
    id: 'grav_negative_potential',
    topic: 'Gravitational Fields',
    term: 'Why Gravitational Potential is Always Negative',
    marks: 2,
    verbatimMarkScheme:
      'Potential is zero at infinity [B1]. The gravitational force is attractive so work is done BY the field / energy is released as mass moves from infinity [B1] (or work done by external agent is negative).',
    requiredKeywords: [
      ['potential is zero at infinity', 'zero at infinity', 'maximum at infinity', 'reference point at infinity'],
      ['attractive', 'force is attractive', 'attractive force'],
      ['work done by field', 'work is done by gravitational force', 'energy decreases', 'negative work by external force'],
    ],
    examinerReportWarning:
      "Candidates fail to explicitly state that gravitational potential is defined to be zero at infinity as the reference point, or fail to state that gravity is an attractive force.",
    pastPaperRef: '9702/43/M/J/21 Q1(b)',
    sampleAcceptableAnswer:
      'Gravitational potential is defined to be zero at infinity. Because gravitational forces are attractive, work is done by the field as the mass approaches from infinity, making potential less than zero (negative).',
  },
  {
    id: 'grav_geostationary',
    topic: 'Gravitational Fields',
    term: 'Geostationary Orbit Features',
    marks: 3,
    verbatimMarkScheme:
      '1. Period is 24 hours / 1 day [B1]\n2. Orbit is equatorial / in the plane of the equator [B1]\n3. Orbit from west to east / in the same direction of Earth rotation [B1].',
    requiredKeywords: [
      ['24 hours', '1 day', 'same period as earth', 'one day'],
      ['equator', 'equatorial', 'plane of the equator'],
      ['west to east', 'same direction of rotation', 'direction of earth rotation'],
    ],
    examinerReportWarning:
      "Do NOT write 'remains stationary in space' (satellites move at ~3 km/s!). It remains stationary relative to a point on the equator. Candidates often miss 'west to east'.",
    pastPaperRef: '9702/42/O/N/22 Q1(b)',
    sampleAcceptableAnswer:
      '1. Has an orbital period of 24 hours.\n2. Must orbit in the plane of the Equator.\n3. Moves from West to East (same direction as Earth rotation).',
  },

  // --- TOPIC 2: Circular Motion ---
  {
    id: 'circ_radian',
    topic: 'Circular Motion',
    term: 'Radian',
    marks: 1,
    verbatimMarkScheme:
      'Angle subtended at the centre of a circle by an arc equal in length to the radius [B1].',
    requiredKeywords: [
      ['angle subtended', 'angle at the centre', 'angle'],
      ['arc equal', 'arc length equal', 'arc of a circle'],
      ['radius', 'length equal to radius'],
    ],
    examinerReportWarning:
      "Do not give 180/pi degrees! The syllabus requires the geometric definition: the angle subtended at the centre of a circle by an arc whose length is equal to the radius.",
    pastPaperRef: '9702/41/M/J/20 Q1(a)',
    sampleAcceptableAnswer:
      'The angle subtended at the centre of a circle by an arc of length equal to the radius of the circle.',
  },
  {
    id: 'circ_angular_velocity',
    topic: 'Circular Motion',
    term: 'Angular Velocity (ω)',
    marks: 1,
    verbatimMarkScheme:
      'Rate of change of angular displacement [B1] (or angle swept per unit time).',
    requiredKeywords: [
      ['rate of change of angular displacement', 'rate of change of angle', 'angular displacement per unit time', 'angle swept per unit time'],
    ],
    examinerReportWarning:
      "Stating 'speed in a circle' or 'change in angle over time' is not precise. Must include 'rate of change of angular displacement'.",
    pastPaperRef: '9702/42/M/J/19 Q1(a)',
    sampleAcceptableAnswer:
      'The rate of change of angular displacement with respect to time.',
  },

  // --- TOPIC 3: Oscillations & SHM ---
  {
    id: 'shm_definition',
    topic: 'Oscillations',
    term: 'Simple Harmonic Motion (SHM)',
    marks: 2,
    verbatimMarkScheme:
      'Acceleration is directly proportional to displacement [B1] and is directed towards a fixed point / equilibrium position / opposite direction to displacement [B1].',
    requiredKeywords: [
      ['acceleration', 'acceleration is'],
      ['directly proportional', 'proportional'],
      ['displacement', 'displacement from'],
      ['fixed point', 'equilibrium', 'opposite direction', 'towards equilibrium', 'equilibrium position'],
    ],
    examinerReportWarning:
      "Writing 'force is proportional to distance' is awarded 0. It must be ACCELERATION directly proportional to DISPLACEMENT and directed towards a fixed point / in the opposite direction.",
    pastPaperRef: '9702/42/F/M/22 Q2(a)',
    sampleAcceptableAnswer:
      'Motion where the acceleration is directly proportional to displacement from a fixed point and is always directed towards that fixed point.',
  },
  {
    id: 'shm_resonance',
    topic: 'Oscillations',
    term: 'Resonance',
    marks: 2,
    verbatimMarkScheme:
      'Oscillations of a system when driving frequency is equal to natural frequency [B1], resulting in maximum amplitude [B1].',
    requiredKeywords: [
      ['driving frequency', 'applied frequency', 'frequency of external force'],
      ['natural frequency', 'natural frequency of system'],
      ['equal', 'matches', 'is equal to'],
      ['maximum amplitude', 'max amplitude', 'amplitude is maximum'],
    ],
    examinerReportWarning:
      "Candidates often write 'system vibrates at maximum speed'. The mark scheme explicitly requires 'maximum amplitude' and 'driving frequency = natural frequency'.",
    pastPaperRef: '9702/41/O/N/23 Q2(a)',
    sampleAcceptableAnswer:
      'Resonance occurs when the driving frequency matches the natural frequency of the vibrating system, resulting in vibrations of maximum amplitude.',
  },
  {
    id: 'shm_critical_damping',
    topic: 'Oscillations',
    term: 'Critical Damping',
    marks: 2,
    verbatimMarkScheme:
      'System returns to equilibrium in minimum time [B1] without oscillating [B1].',
    requiredKeywords: [
      ['minimum time', 'shortest time', 'fastest possible time'],
      ['equilibrium', 'equilibrium position'],
      ['without oscillating', 'no oscillation', 'does not overshoot', 'no overshooting'],
    ],
    examinerReportWarning:
      "Must state both: minimum possible time AND without any oscillation (overshoot). Just saying 'stops vibrating quickly' receives 0 marks.",
    pastPaperRef: '9702/43/M/J/22 Q2(b)',
    sampleAcceptableAnswer:
      'Damping that causes the oscillating system to return to its equilibrium position in the minimum possible time without overshooting or oscillating.',
  },

  // --- TOPIC 4: Thermal Physics & Ideal Gases ---
  {
    id: 'therm_internal_energy',
    topic: 'Thermal Physics',
    term: 'Internal Energy of a System',
    marks: 2,
    verbatimMarkScheme:
      'Sum of the random distribution of kinetic and potential energies [B1] associated with the molecules / atoms / particles of the system [B1].',
    requiredKeywords: [
      ['sum of', 'total of'],
      ['random', 'random distribution'],
      ['kinetic and potential', 'kinetic energy and potential energy'],
      ['molecules', 'atoms', 'particles'],
    ],
    examinerReportWarning:
      "Candidates frequently omit the word 'random'! The mark scheme insists on: sum of the random distribution of kinetic and potential energies of the atoms/molecules.",
    pastPaperRef: '9702/42/M/J/23 Q3(a)',
    sampleAcceptableAnswer:
      'The sum of the random distribution of kinetic and potential energies associated with the molecules or atoms of a system.',
  },
  {
    id: 'therm_first_law',
    topic: 'Thermal Physics',
    term: 'First Law of Thermodynamics (ΔU = q + w)',
    marks: 2,
    verbatimMarkScheme:
      'Increase in internal energy = thermal energy transferred TO the system + work done ON the system [B1]. Must define all three terms with precise sign conventions [B1].',
    requiredKeywords: [
      ['increase in internal energy', 'change in internal energy', 'internal energy'],
      ['thermal energy transferred to', 'heat supplied to', 'heat added to'],
      ['work done on', 'work done on the system'],
    ],
    examinerReportWarning:
      "Crucial: CIE 9702 uses the IUPAC convention ΔU = q + w. 'w' is work done ON the system. If you say 'work done BY the system', it must be written as ΔU = q - w.",
    pastPaperRef: '9702/41/O/N/22 Q3(a)',
    sampleAcceptableAnswer:
      'The increase in internal energy of a system is equal to the thermal energy supplied TO the system plus the work done ON the system (ΔU = q + w).',
  },
  {
    id: 'therm_specific_heat_capacity',
    topic: 'Thermal Physics',
    term: 'Specific Heat Capacity (c)',
    marks: 2,
    verbatimMarkScheme:
      'Thermal energy per unit mass [B1] per unit temperature change [B1] (or energy required to raise temperature of 1 kg by 1 K / 1 °C).',
    requiredKeywords: [
      ['thermal energy', 'energy required', 'heat energy'],
      ['per unit mass', 'unit mass', '1 kg'],
      ['per unit temperature change', 'per unit change in temperature', '1 kelvin', '1 k', '1 degree'],
    ],
    examinerReportWarning:
      "Must state 'per unit mass' and 'per unit temperature change'. 'Heat needed to increase temperature' gets 0.",
    pastPaperRef: '9702/42/M/J/21 Q3(a)',
    sampleAcceptableAnswer:
      'Thermal energy required per unit mass to raise the temperature of a substance by one unit of temperature (1 Kelvin or 1 °C).',
  },
  {
    id: 'therm_specific_latent_heat',
    topic: 'Thermal Physics',
    term: 'Specific Latent Heat (L)',
    marks: 2,
    verbatimMarkScheme:
      'Thermal energy required per unit mass [B1] to change state at constant temperature [B1].',
    requiredKeywords: [
      ['thermal energy', 'energy required', 'heat'],
      ['per unit mass', 'unit mass', '1 kg'],
      ['change of state', 'change phase', 'change state'],
      ['constant temperature', 'without change in temperature', 'without changing temperature'],
    ],
    examinerReportWarning:
      "The phrase 'at constant temperature' or 'without change in temperature' is mandatory for the second mark. Omitting it is the #1 mistake in examiner reports.",
    pastPaperRef: '9702/42/F/M/21 Q3(b)',
    sampleAcceptableAnswer:
      'Thermal energy required per unit mass to change the state of a substance without any change in temperature.',
  },

  // --- TOPIC 5: Capacitance & Electric Fields ---
  {
    id: 'cap_capacitance',
    topic: 'Capacitance',
    term: 'Capacitance (C)',
    marks: 1,
    verbatimMarkScheme:
      'Charge per unit potential (or charge per unit potential difference / ratio of charge on one plate to potential difference across plates) [B1].',
    requiredKeywords: [
      ['charge per unit potential', 'charge per unit potential difference', 'ratio of charge to potential', 'ratio of charge to potential difference', 'q/v'],
    ],
    examinerReportWarning:
      "Writing 'amount of charge a capacitor can hold' is rejected. Must be 'charge per unit potential difference' or 'ratio of charge to p.d.'.",
    pastPaperRef: '9702/42/M/J/22 Q6(a)',
    sampleAcceptableAnswer:
      'Charge stored on one plate per unit potential difference between the plates (C = Q/V).',
  },
  {
    id: 'cap_time_constant',
    topic: 'Capacitance',
    term: 'Time Constant (τ = RC)',
    marks: 1,
    verbatimMarkScheme:
      'Time taken for the discharge current / charge / potential difference to fall to 1/e (approx 37%) of its initial value [B1].',
    requiredKeywords: [
      ['time taken', 'time for'],
      ['charge', 'potential difference', 'current', 'voltage'],
      ['1/e', '37%', '1/e of initial', '36.8%'],
    ],
    examinerReportWarning:
      "Stating 'time for capacitor to discharge' is meaningless. Must state 'time taken for charge/voltage/current to fall to 1/e of its initial value'.",
    pastPaperRef: '9702/41/O/N/21 Q6(b)',
    sampleAcceptableAnswer:
      'The time taken for the charge, voltage, or current to fall to 1/e (approximately 37%) of its initial value during discharge.',
  },

  // --- TOPIC 6: Magnetic Fields & Hall Effect ---
  {
    id: 'mag_flux_density',
    topic: 'Magnetic Fields',
    term: 'Magnetic Flux Density (B)',
    marks: 2,
    verbatimMarkScheme:
      'Force per unit length [B1] on a straight conductor carrying unit current [B1] placed at right angles / perpendicular to the magnetic field [B1].',
    requiredKeywords: [
      ['force per unit length', 'force per length'],
      ['unit current', 'current of 1 a', 'carrying unit current', 'per unit current'],
      ['perpendicular', 'right angles', 'at right angles to field'],
    ],
    examinerReportWarning:
      "Candidates lose marks for omitting 'perpendicular / at right angles to the field' or 'force per unit length per unit current'. Both conditions are mandatory.",
    pastPaperRef: '9702/42/O/N/23 Q7(a)',
    sampleAcceptableAnswer:
      'The force per unit length on a long straight conductor carrying unit current placed perpendicular to the magnetic field (F = BIL).',
  },
  {
    id: 'mag_tesla',
    topic: 'Magnetic Fields',
    term: 'The Tesla (T)',
    marks: 1,
    verbatimMarkScheme:
      'One newton per ampere per metre [B1] for a conductor perpendicular to the field.',
    requiredKeywords: [
      ['newton per ampere per metre', 'n a-1 m-1', 'one newton per ampere per metre'],
      ['perpendicular', 'at right angles'],
    ],
    examinerReportWarning:
      "Define Tesla by units: 1 Tesla is the magnetic flux density that produces a force of 1 Newton per metre on a conductor carrying 1 Ampere perpendicular to the field.",
    pastPaperRef: '9702/41/M/J/21 Q7(a)',
    sampleAcceptableAnswer:
      'The magnetic flux density that produces a force of 1 Newton per metre on a straight conductor carrying a current of 1 Ampere perpendicular to the field (1 T = 1 N A⁻¹ m⁻¹).',
  },

  // --- TOPIC 7: Electromagnetic Induction ---
  {
    id: 'em_magnetic_flux',
    topic: 'Electromagnetic Induction',
    term: 'Magnetic Flux (Φ)',
    marks: 1,
    verbatimMarkScheme:
      'Product of magnetic flux density and the area normal / perpendicular to the field [B1] (Φ = BA).',
    requiredKeywords: [
      ['product of magnetic flux density and area', 'magnetic flux density multiplied by area'],
      ['normal', 'perpendicular', 'perpendicular to field'],
    ],
    examinerReportWarning:
      "Do not forget to specify 'area perpendicular / normal to the magnetic field'. Simply writing 'B times A' is not acceptable without defining normal area.",
    pastPaperRef: '9702/42/F/M/22 Q8(a)',
    sampleAcceptableAnswer:
      'The product of the magnetic flux density and the area perpendicular to the direction of the magnetic field (Φ = BA).',
  },
  {
    id: 'em_faradays_law',
    topic: 'Electromagnetic Induction',
    term: "Faraday's Law of Electromagnetic Induction",
    marks: 1,
    verbatimMarkScheme:
      'Induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage [B1].',
    requiredKeywords: [
      ['induced e.m.f.', 'induced emf', 'magnitude of induced emf'],
      ['directly proportional', 'proportional'],
      ['rate of change of magnetic flux linkage', 'rate of change of flux linkage'],
    ],
    examinerReportWarning:
      "Writing 'flux' instead of 'flux linkage' (for a coil of N turns) loses the mark! It must be 'rate of change of magnetic flux linkage'.",
    pastPaperRef: '9702/42/M/J/23 Q8(a)',
    sampleAcceptableAnswer:
      'The magnitude of induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage.',
  },
  {
    id: 'em_lenzs_law',
    topic: 'Electromagnetic Induction',
    term: "Lenz's Law",
    marks: 1,
    verbatimMarkScheme:
      'The direction of the induced e.m.f. / current is such that it causes effects to oppose the change producing it [B1].',
    requiredKeywords: [
      ['direction of induced', 'induced emf', 'induced current'],
      ['oppose the change', 'opposes the change', 'opposes the change producing it', 'opposes the change causing it'],
    ],
    examinerReportWarning:
      "Must state 'opposes the CHANGE producing it', not just 'opposes the magnetic field' or 'opposes motion'. It is the change in flux linkage that is opposed.",
    pastPaperRef: '9702/41/O/N/22 Q8(a)',
    sampleAcceptableAnswer:
      'The direction of an induced e.m.f. or current is such as to oppose the change producing it.',
  },

  // --- TOPIC 8: Quantum Physics ---
  {
    id: 'quant_photon',
    topic: 'Quantum Physics',
    term: 'Photon',
    marks: 1,
    verbatimMarkScheme:
      'A quantum / packet / discrete amount of electromagnetic energy [B1].',
    requiredKeywords: [
      ['quantum of', 'packet of', 'discrete amount of'],
      ['electromagnetic energy', 'em energy', 'radiation energy'],
    ],
    examinerReportWarning:
      "Writing 'particle of light' without mentioning 'quantum/packet of electromagnetic energy' is penalized in Paper 4 mark schemes.",
    pastPaperRef: '9702/42/M/J/22 Q9(a)',
    sampleAcceptableAnswer:
      'A discrete packet or quantum of electromagnetic energy (E = hf).',
  },
  {
    id: 'quant_work_function',
    topic: 'Quantum Physics',
    term: 'Work Function Energy (Φ)',
    marks: 1,
    verbatimMarkScheme:
      'Minimum photon energy required to release an electron from the surface of a metal [B1].',
    requiredKeywords: [
      ['minimum energy', 'minimum photon energy'],
      ['release an electron', 'emit an electron', 'remove an electron'],
      ['surface of a metal', 'surface of the metal', 'metal surface'],
    ],
    examinerReportWarning:
      "Crucial: 'minimum' is strictly required. Also 'from the surface' of a metal. Omitting 'minimum' or 'surface' results in 0 marks.",
    pastPaperRef: '9702/42/O/N/21 Q9(a)',
    sampleAcceptableAnswer:
      'The minimum amount of photon energy required to release an electron from the surface of a metal.',
  },
  {
    id: 'quant_threshold_frequency',
    topic: 'Quantum Physics',
    term: 'Threshold Frequency (f₀)',
    marks: 1,
    verbatimMarkScheme:
      'Minimum frequency of electromagnetic radiation required to cause the emission of electrons from a metal surface [B1].',
    requiredKeywords: [
      ['minimum frequency', 'lowest frequency'],
      ['emission of electrons', 'release of electrons', 'photoelectric emission'],
      ['surface', 'metal surface'],
    ],
    examinerReportWarning:
      "Must include 'minimum frequency'. Frequency required for photoelectric emission from metal surface.",
    pastPaperRef: '9702/41/M/J/20 Q9(a)',
    sampleAcceptableAnswer:
      'The minimum frequency of incident electromagnetic radiation required to emit electrons from the surface of a metal.',
  },
  {
    id: 'quant_de_broglie',
    topic: 'Quantum Physics',
    term: 'de Broglie Wavelength (λ)',
    marks: 1,
    verbatimMarkScheme:
      'Wavelength associated with a moving particle / particle that has momentum [B1] (λ = h/p).',
    requiredKeywords: [
      ['wavelength associated with', 'wavelength of'],
      ['moving particle', 'particle having momentum', 'particle in motion'],
    ],
    examinerReportWarning:
      "State that it is the wavelength associated with a particle that is moving / has momentum.",
    pastPaperRef: '9702/42/F/M/23 Q9(a)',
    sampleAcceptableAnswer:
      'The wavelength associated with a particle that is moving or has momentum (λ = h/p).',
  },

  // --- TOPIC 9: Nuclear Physics ---
  {
    id: 'nuc_binding_energy',
    topic: 'Nuclear Physics',
    term: 'Binding Energy of a Nucleus',
    marks: 2,
    verbatimMarkScheme:
      'Minimum energy required to separate the nucleons of a nucleus to infinity [B1] (or energy released when nucleons assemble into nucleus from infinity).',
    requiredKeywords: [
      ['energy required', 'minimum energy', 'work done'],
      ['separate', 'split', 'break apart'],
      ['nucleons of a nucleus', 'all nucleons', 'constituent nucleons'],
      ['to infinity', 'completely separate'],
    ],
    examinerReportWarning:
      "Never say 'energy that holds the nucleus together'! That is a casual description awarded 0. The mark scheme demands: minimum energy required to completely separate all nucleons in a nucleus to infinity.",
    pastPaperRef: '9702/42/M/J/23 Q10(a)',
    sampleAcceptableAnswer:
      'The minimum energy required to completely separate all the constituent nucleons of a nucleus to infinity.',
  },
  {
    id: 'nuc_decay_constant',
    topic: 'Nuclear Physics',
    term: 'Radioactive Decay Constant (λ)',
    marks: 1,
    verbatimMarkScheme:
      'Probability per unit time [B1] of the decay of a nucleus.',
    requiredKeywords: [
      ['probability per unit time', 'probability of decay per unit time', 'fraction decaying per unit time'],
      ['decay of a nucleus', 'nucleus decays'],
    ],
    examinerReportWarning:
      "Saying 'rate of decay' is WRONG (that is Activity!). Decay constant is the PROBABILITY of decay per unit time.",
    pastPaperRef: '9702/41/O/N/22 Q10(a)',
    sampleAcceptableAnswer:
      'The probability per unit time of the decay of a given radioactive nucleus.',
  },
  {
    id: 'nuc_activity',
    topic: 'Nuclear Physics',
    term: 'Activity (A)',
    marks: 1,
    verbatimMarkScheme:
      'Number of decays per unit time [B1] (or rate of decay of radioactive nuclei).',
    requiredKeywords: [
      ['number of decays per unit time', 'rate of decay of nuclei', 'decays per second', 'rate at which nuclei decay'],
    ],
    examinerReportWarning:
      "Activity = number of nuclei decaying per unit time (A = λN). Do not confuse with decay constant.",
    pastPaperRef: '9702/42/F/M/22 Q10(a)',
    sampleAcceptableAnswer:
      'The number of radioactive decays occurring per unit time in a sample (A = -dN/dt = λN).',
  },

  // --- TOPIC 10: Medical Physics & Ultrasound ---
  {
    id: 'med_acoustic_impedance',
    topic: 'Medical Physics',
    term: 'Acoustic Impedance (Z)',
    marks: 1,
    verbatimMarkScheme:
      'Product of the density of the medium and the speed of the acoustic / ultrasound wave in the medium [B1] (Z = ρc).',
    requiredKeywords: [
      ['product of density and speed', 'density multiplied by speed', 'product of density and wave speed'],
      ['density', 'speed of ultrasound', 'speed of wave'],
    ],
    examinerReportWarning:
      "Write Z = ρc and state: product of the density of the medium and the speed of ultrasound in that medium.",
    pastPaperRef: '9702/42/M/J/21 Q11(a)',
    sampleAcceptableAnswer:
      'The product of the density of a medium and the speed of the acoustic (ultrasound) wave in that medium (Z = ρc).',
  },
  {
    id: 'med_coupling_gel',
    topic: 'Medical Physics',
    term: 'Function of Coupling Gel in Ultrasound',
    marks: 2,
    verbatimMarkScheme:
      'Gel has acoustic impedance similar / equal to skin / body [B1] so that reflection at skin is reduced / minimized / more ultrasound is transmitted [B1].',
    requiredKeywords: [
      ['acoustic impedance', 'impedance similar', 'impedance matches'],
      ['similar to skin', 'matches skin', 'equal to skin'],
      ['reflection is reduced', 'minimizes reflection', 'less reflection', 'transmits into body'],
    ],
    examinerReportWarning:
      "Must state that the gel has a specific acoustic impedance matching that of human tissue/skin, thereby minimizing the reflection of ultrasound that would otherwise occur at an air-skin interface.",
    pastPaperRef: '9702/42/O/N/23 Q11(b)',
    sampleAcceptableAnswer:
      'Coupling medium (gel) has an acoustic impedance matching that of human skin, eliminating air gaps and preventing significant reflection at the skin boundary so ultrasound enters the patient.',
  },

  // --- TOPIC 11: Astronomy & Cosmology ---
  {
    id: 'astro_standard_candle',
    topic: 'Astronomy & Cosmology',
    term: 'Standard Candle',
    marks: 1,
    verbatimMarkScheme:
      'An astronomical object of known luminosity [B1].',
    requiredKeywords: [
      ['astronomical object', 'celestial object', 'star'],
      ['known luminosity', 'luminosity is known'],
    ],
    examinerReportWarning:
      "Do NOT say 'known brightness' (brightness/radiant flux depends on distance). It MUST be 'known luminosity'.",
    pastPaperRef: '9702/42/M/J/22 Q12(a)',
    sampleAcceptableAnswer:
      'An astronomical object (such as a Cepheid variable or Type 1a supernova) whose luminosity is known.',
  },
  {
    id: 'astro_hubbles_law',
    topic: 'Astronomy & Cosmology',
    term: "Hubble's Law",
    marks: 1,
    verbatimMarkScheme:
      'The recession speed / velocity of a galaxy is directly proportional to its distance from Earth / observer [B1] (v = H₀d).',
    requiredKeywords: [
      ['recession speed', 'recession velocity', 'speed of recession'],
      ['directly proportional', 'proportional'],
      ['distance', 'distance from observer', 'distance from earth'],
    ],
    examinerReportWarning:
      "Must state 'recession velocity' (the speed at which galaxies are moving away) is directly proportional to their distance from the observer/Earth.",
    pastPaperRef: '9702/41/O/N/21 Q12(a)',
    sampleAcceptableAnswer:
      'The recession velocity of a distant galaxy is directly proportional to its distance from Earth (v = H₀d).',
  },
];
