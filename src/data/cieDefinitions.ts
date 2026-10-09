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
  // ==========================================
  // TOPIC 1: Circular Motion
  // ==========================================
  {
    id: 'circ_radian',
    topic: 'Circular Motion',
    term: 'Radian (rad)',
    marks: 1,
    verbatimMarkScheme:
      'Angle subtended at the centre of a circle by an arc equal in length to the radius [B1].',
    requiredKeywords: [
      ['angle subtended', 'angle at the centre', 'angle at center', 'subtended angle'],
      ['arc equal', 'arc length equal', 'arc of a circle', 'arc having length'],
      ['radius', 'length equal to radius'],
    ],
    examinerReportWarning:
      "Do NOT write '180/pi degrees'. Cambridge insists on the geometric definition: the angle subtended at the centre of a circle by an arc equal in length to the radius.",
    pastPaperRef: '9702/41/M/J/20 Q1(a)',
    sampleAcceptableAnswer:
      'The angle subtended at the centre of a circle by an arc whose length is equal to the radius of the circle.',
  },
  {
    id: 'circ_angular_velocity',
    topic: 'Circular Motion',
    term: 'Angular Velocity (ω)',
    marks: 1,
    verbatimMarkScheme:
      'Rate of change of angular displacement [B1] (or angle swept out per unit time).',
    requiredKeywords: [
      ['rate of change of angular displacement', 'rate of change of angle', 'angular displacement per unit time', 'angle swept out per unit time', 'rate of change of theta'],
    ],
    examinerReportWarning:
      "Stating 'speed in a circle' or 'change in angle over time' is not rewarded. Must include 'rate of change of angular displacement'.",
    pastPaperRef: '9702/42/M/J/19 Q1(a)',
    sampleAcceptableAnswer:
      'The rate of change of angular displacement with respect to time (ω = Δθ / Δt).',
  },
  {
    id: 'circ_centripetal_acceleration',
    topic: 'Circular Motion',
    term: 'Centripetal Acceleration',
    marks: 2,
    verbatimMarkScheme:
      'Acceleration perpendicular to the velocity [B1] directed towards the centre of the circular path [B1].',
    requiredKeywords: [
      ['acceleration perpendicular', 'perpendicular to velocity', 'perpendicular to motion', 'at right angles to velocity'],
      ['towards the centre', 'towards center', 'directed to center', 'directed inwards to centre'],
    ],
    examinerReportWarning:
      "Must state that it is perpendicular to the instantaneous velocity AND directed towards the centre of the circle.",
    pastPaperRef: '9702/42/O/N/20 Q1(a)',
    sampleAcceptableAnswer:
      'The acceleration directed perpendicularly to the linear velocity towards the centre of the circular path (a = v²/r = ω²r).',
  },

  // ==========================================
  // TOPIC 2: Gravitational Fields
  // ==========================================
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
      'The gravitational force of attraction between two point masses is directly proportional to the product of their masses and inversely proportional to the square of their separation (F = GMm/r²).',
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
      'Gravitational force exerted per unit mass on a small point mass placed at that point in the field (g = F / m).',
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
      'Work done per unit mass in bringing a small test mass from infinity to the point.',
  },
  {
    id: 'grav_negative_potential',
    topic: 'Gravitational Fields',
    term: 'Why Gravitational Potential is Always Negative',
    marks: 2,
    verbatimMarkScheme:
      'Potential is defined to be zero at infinity [B1]. Gravitational force is attractive so work is done BY the field / energy is released as mass moves from infinity [B1] (or work done by external agent is negative).',
    requiredKeywords: [
      ['potential is zero at infinity', 'zero at infinity', 'reference point at infinity', 'defined as zero at infinity'],
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
    id: 'grav_escape_velocity',
    topic: 'Gravitational Fields',
    term: 'Escape Speed / Velocity',
    marks: 2,
    verbatimMarkScheme:
      'Minimum speed required for an object at the surface of a planet [B1] to escape to infinity / escape the gravitational field completely [B1].',
    requiredKeywords: [
      ['minimum speed', 'minimum velocity'],
      ['escape to infinity', 'escape the field', 'reach infinity', 'escape completely'],
    ],
    examinerReportWarning:
      "Must state 'minimum speed' and 'to escape to infinity' (or where total energy is zero).",
    pastPaperRef: '9702/42/M/J/20 Q1(b)',
    sampleAcceptableAnswer:
      'The minimum speed required for an object on the surface of a planet to escape completely from the gravitational field to infinity (v = √(2GM/R)).',
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
      '1. Period is 24 hours (matches Earth rotation period).\n2. Orbits directly above the Equator.\n3. Moves from West to East (in the same direction as Earth rotation).',
  },

  // ==========================================
  // TOPIC 3: Temperature & Thermal Physics
  // ==========================================
  {
    id: 'therm_thermal_equilibrium',
    topic: 'Thermal Physics',
    term: 'Thermal Equilibrium',
    marks: 1,
    verbatimMarkScheme:
      'No net flow / transfer of thermal energy between two bodies [B1] (they are at the same temperature).',
    requiredKeywords: [
      ['no net flow', 'no net transfer', 'net transfer is zero', 'no net exchange'],
      ['thermal energy', 'heat energy', 'heat'],
    ],
    examinerReportWarning:
      "Must state 'no NET transfer of thermal energy'. Thermal energy is still exchanged microscopically in equal amounts in both directions.",
    pastPaperRef: '9702/41/M/J/21 Q2(a)',
    sampleAcceptableAnswer:
      'A condition where there is no net transfer of thermal energy between two regions or bodies in contact.',
  },
  {
    id: 'therm_absolute_zero',
    topic: 'Thermal Physics',
    term: 'Absolute Zero (0 K)',
    marks: 2,
    verbatimMarkScheme:
      'Temperature at which internal energy is minimum [B1] / substances have minimum kinetic energy [B1] (or temperature at which ideal gas has zero pressure/volume).',
    requiredKeywords: [
      ['minimum internal energy', 'internal energy is minimum', 'lowest possible temperature', 'zero kelvin'],
      ['minimum kinetic energy', 'zero kinetic energy', 'molecules have minimum energy'],
    ],
    examinerReportWarning:
      "Do not say 'zero internal energy' because quantum zero-point energy still exists. Say 'minimum internal energy' or 'minimum molecular kinetic energy'.",
    pastPaperRef: '9702/42/M/J/20 Q2(a)',
    sampleAcceptableAnswer:
      'The theoretical lowest temperature at which substances have minimum internal energy and minimum kinetic energy (0 K or -273.15 °C).',
  },
  {
    id: 'therm_thermodynamic_scale',
    topic: 'Thermal Physics',
    term: 'Thermodynamic (Kelvin) Temperature Scale',
    marks: 2,
    verbatimMarkScheme:
      'Scale does not depend on the property of any particular substance [B1] and has absolute zero as its zero point [B1].',
    requiredKeywords: [
      ['independent of property', 'does not depend on any substance', 'independent of substance', 'not dependent on thermometric property'],
      ['absolute zero', 'zero at absolute zero', 'fixed point at absolute zero'],
    ],
    examinerReportWarning:
      "Must state: (1) Independent of the physical properties of any specific substance, and (2) Fixed zero point is absolute zero.",
    pastPaperRef: '9702/41/O/N/20 Q2(a)',
    sampleAcceptableAnswer:
      'A temperature scale that is independent of the physical properties of any particular substance and has absolute zero as its zero point.',
  },
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
      'Thermal energy required per unit mass to change the state of a substance without any change in temperature (L = Q / m).',
  },

  // ==========================================
  // TOPIC 4: Ideal Gases
  // ==========================================
  {
    id: 'gas_ideal_gas',
    topic: 'Ideal Gases',
    term: 'Ideal Gas',
    marks: 2,
    verbatimMarkScheme:
      'A gas that obeys the equation of state pV = nRT (or pV = NkT) [B1] for all values of pressure, volume, and thermodynamic temperature [B1].',
    requiredKeywords: [
      ['pv = nrt', 'pv = nkt', 'obeys the equation of state'],
      ['all values of', 'all temperatures and pressures', 'all p, v, and t'],
    ],
    examinerReportWarning:
      "Must specify 'for all values of p, V and T' or 'at all pressures, volumes, and temperatures'.",
    pastPaperRef: '9702/42/M/J/22 Q2(a)',
    sampleAcceptableAnswer:
      'A theoretical gas that obeys the equation of state pV = nRT at all pressures, volumes, and thermodynamic temperatures.',
  },
  {
    id: 'gas_kinetic_assumptions',
    topic: 'Ideal Gases',
    term: 'Assumptions of the Kinetic Theory of Gases',
    marks: 3,
    verbatimMarkScheme:
      '1. Large number of particles in rapid, random motion [B1]\n2. Volume of particles is negligible compared to volume of container [B1]\n3. Collisions are perfectly elastic [B1]\n4. Intermolecular forces are negligible except during collisions [B1]\n5. Time of collision is negligible compared to time between collisions [B1]. (Any 3 for 3 marks).',
    requiredKeywords: [
      ['random motion', 'particles in random motion', 'constant random motion'],
      ['negligible volume', 'volume of molecules is negligible', 'point particles'],
      ['elastic collisions', 'perfectly elastic', 'collisions are elastic'],
      ['no intermolecular forces', 'negligible forces between particles', 'no forces of attraction'],
    ],
    examinerReportWarning:
      "Common error: Writing 'elastic' without 'perfectly elastic' or forgetting that particle volume is negligible compared to container volume.",
    pastPaperRef: '9702/41/O/N/21 Q2(b)',
    sampleAcceptableAnswer:
      '1. Molecules are in continuous, random, rapid motion.\n2. Volume of molecules is negligible compared to the total volume of the container.\n3. Collisions between molecules and container walls are perfectly elastic.\n4. No intermolecular forces exist between molecules except during collisions.',
  },
  {
    id: 'gas_mole',
    topic: 'Ideal Gases',
    term: 'The Mole / Avogadro Constant',
    marks: 2,
    verbatimMarkScheme:
      'The amount of substance containing the same number of particles as there are atoms in 0.012 kg of carbon-12 [B1]. Avogadro constant NA is 6.02 × 10²³ mol⁻¹ [B1].',
    requiredKeywords: [
      ['amount of substance', 'quantity of substance'],
      ['carbon-12', '12 grams of carbon-12', '0.012 kg of carbon-12', 'c-12'],
    ],
    examinerReportWarning:
      "Must reference carbon-12 (0.012 kg of carbon-12) or the exact number of entities (6.02 × 10²³).",
    pastPaperRef: '9702/42/O/N/19 Q2(a)',
    sampleAcceptableAnswer:
      'The amount of substance that contains as many elementary entities as there are atoms in 0.012 kg of carbon-12.',
  },

  // ==========================================
  // TOPIC 5: Oscillations & SHM
  // ==========================================
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
      'Motion where the acceleration is directly proportional to displacement from a fixed point and is always directed towards that fixed point (a = -ω²x).',
  },
  {
    id: 'shm_angular_frequency',
    topic: 'Oscillations',
    term: 'Angular Frequency (ω in SHM)',
    marks: 1,
    verbatimMarkScheme:
      'Product of 2π and the frequency of oscillation [B1] (ω = 2πf = 2π/T).',
    requiredKeywords: [
      ['product of 2pi and frequency', '2pi times frequency', '2pi f', '2 pi / t', 'product of 2 pi and frequency'],
    ],
    examinerReportWarning:
      "State that it is equal to 2π times the frequency (ω = 2πf).",
    pastPaperRef: '9702/41/M/J/22 Q3(a)',
    sampleAcceptableAnswer:
      'The product of 2π and the frequency of the oscillation (ω = 2πf).',
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

  // ==========================================
  // TOPIC 6: Electric Fields
  // ==========================================
  {
    id: 'elec_coulombs_law',
    topic: 'Electric Fields',
    term: "Coulomb's Law",
    marks: 2,
    verbatimMarkScheme:
      'Electric force between two point charges is directly proportional to the product of their charges [B1] and inversely proportional to the square of their separation [B1].',
    requiredKeywords: [
      ['point charges', 'two point charges'],
      ['force', 'electric force', 'electrostatic force'],
      ['directly proportional', 'proportional'],
      ['product of', 'product of charges', 'charges multiplied'],
      ['inversely proportional', 'inverse square'],
      ['square of', 'separation squared', 'distance squared'],
    ],
    examinerReportWarning:
      "Must state 'point charges' and 'square of their separation'.",
    pastPaperRef: '9702/42/M/J/21 Q5(a)',
    sampleAcceptableAnswer:
      'The electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of their separation (F = Q₁Q₂ / 4πε₀r²).',
  },
  {
    id: 'elec_field_strength',
    topic: 'Electric Fields',
    term: 'Electric Field Strength (E)',
    marks: 1,
    verbatimMarkScheme:
      'Electric force per unit positive charge [B1] acting on a stationary test charge.',
    requiredKeywords: [
      ['force per unit positive charge', 'force per unit charge', 'force per positive charge'],
      ['positive charge', 'unit positive charge', 'small test charge'],
    ],
    examinerReportWarning:
      "Must state 'per unit positive charge' or 'force per unit charge on a positive test charge'.",
    pastPaperRef: '9702/41/O/N/20 Q5(a)',
    sampleAcceptableAnswer:
      'The electrostatic force exerted per unit positive charge acting on a small stationary test charge placed at that point (E = F / q).',
  },
  {
    id: 'elec_potential',
    topic: 'Electric Fields',
    term: 'Electric Potential (V)',
    marks: 2,
    verbatimMarkScheme:
      'Work done per unit positive charge [B1] in bringing a small test charge from infinity to the point [B1].',
    requiredKeywords: [
      ['work done per unit positive charge', 'work done per unit charge', 'work done per positive charge'],
      ['from infinity', 'from infinity to the point', 'infinity to that point'],
    ],
    examinerReportWarning:
      "Must state 'per unit positive charge' and 'from infinity'.",
    pastPaperRef: '9702/42/F/M/22 Q5(a)',
    sampleAcceptableAnswer:
      'The work done per unit positive charge in bringing a small test charge from infinity to that point in the electric field.',
  },

  // ==========================================
  // TOPIC 7: Capacitance
  // ==========================================
  {
    id: 'cap_capacitance',
    topic: 'Capacitance',
    term: 'Capacitance (C)',
    marks: 1,
    verbatimMarkScheme:
      'Charge stored on one plate per unit potential difference between plates [B1] (C = Q/V).',
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
    id: 'cap_farad',
    topic: 'Capacitance',
    term: 'The Farad (F)',
    marks: 1,
    verbatimMarkScheme:
      'One coulomb per volt [B1] (1 F = 1 C V⁻¹).',
    requiredKeywords: [
      ['coulomb per volt', 'one coulomb per volt', 'c v-1', '1 c v-1'],
    ],
    examinerReportWarning:
      "Define Farad in terms of base or derived SI units: one Coulomb per Volt.",
    pastPaperRef: '9702/41/M/J/19 Q6(a)',
    sampleAcceptableAnswer:
      'One Coulomb of charge stored per Volt of potential difference across the plates (1 F = 1 C V⁻¹).',
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

  // ==========================================
  // TOPIC 8: Magnetic Fields & Hall Effect
  // ==========================================
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
  {
    id: 'mag_hall_voltage',
    topic: 'Magnetic Fields',
    term: 'Hall Effect / Hall Voltage',
    marks: 2,
    verbatimMarkScheme:
      'Potential difference developed across a current-carrying conductor / semiconductor [B1] perpendicular to both the current and an applied magnetic field [B1].',
    requiredKeywords: [
      ['potential difference', 'voltage developed', 'pd'],
      ['perpendicular to both', 'at right angles to both', 'transverse to'],
      ['current and magnetic field', 'magnetic field and current'],
    ],
    examinerReportWarning:
      "Must state that the potential difference is transverse / perpendicular to BOTH the magnetic field and the direction of current.",
    pastPaperRef: '9702/42/M/J/22 Q7(a)',
    sampleAcceptableAnswer:
      'The transverse potential difference produced across the faces of a conductor or semiconductor slice when carrying a current in the presence of a perpendicular magnetic field (VH = BI / ntq).',
  },

  // ==========================================
  // TOPIC 9: Electromagnetic Induction
  // ==========================================
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
    id: 'em_weber',
    topic: 'Electromagnetic Induction',
    term: 'The Weber (Wb)',
    marks: 1,
    verbatimMarkScheme:
      'One tesla metre squared [B1] (1 Wb = 1 T m²).',
    requiredKeywords: [
      ['tesla metre squared', 'one tesla metre squared', 't m2', '1 t m2'],
    ],
    examinerReportWarning:
      "1 Weber = 1 Tesla × 1 square metre (or one volt second).",
    pastPaperRef: '9702/41/O/N/19 Q8(a)',
    sampleAcceptableAnswer:
      'The magnetic flux when a uniform magnetic field of flux density 1 Tesla passes perpendicularly through an area of 1 square metre (1 Wb = 1 T m²).',
  },
  {
    id: 'em_flux_linkage',
    topic: 'Electromagnetic Induction',
    term: 'Magnetic Flux Linkage',
    marks: 1,
    verbatimMarkScheme:
      'Product of the magnetic flux and the number of turns in the coil [B1] (NΦ = BAN).',
    requiredKeywords: [
      ['product of magnetic flux and number of turns', 'magnetic flux multiplied by number of turns', 'n times phi', 'ban'],
    ],
    examinerReportWarning:
      "State: product of the magnetic flux passing through a coil and the number of turns of the coil (NΦ).",
    pastPaperRef: '9702/42/O/N/20 Q8(a)',
    sampleAcceptableAnswer:
      'The product of the magnetic flux through a coil and the number of turns of wire on that coil (Flux Linkage = NΦ).',
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
      'The magnitude of induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage (E = -d(NΦ)/dt).',
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

  // ==========================================
  // TOPIC 10: Alternating Currents
  // ==========================================
  {
    id: 'ac_rms_current',
    topic: 'Alternating Currents',
    term: 'Root-Mean-Square (r.m.s.) Current / Voltage',
    marks: 2,
    verbatimMarkScheme:
      'The value of steady direct current / voltage [B1] that dissipates thermal energy at the same rate / produces the same power in a resistor as the alternating current [B1].',
    requiredKeywords: [
      ['direct current', 'steady direct current', 'dc', 'steady current'],
      ['same rate', 'same power', 'dissipates energy at the same rate', 'produces the same power'],
      ['resistor', 'in a given resistor'],
    ],
    examinerReportWarning:
      "Must mention 'steady direct current' and 'produces power at the same rate in a given resistor'. Writing 'average current' gets 0 marks.",
    pastPaperRef: '9702/42/M/J/21 Q8(a)',
    sampleAcceptableAnswer:
      'The value of a steady direct current that produces the same average power (or dissipates heat at the same rate) in a given resistor as the alternating current (I_rms = I₀ / √2).',
  },
  {
    id: 'ac_rectification_smoothing',
    topic: 'Alternating Currents',
    term: 'Smoothing by a Capacitor in Rectification',
    marks: 2,
    verbatimMarkScheme:
      'Capacitor charges up at peak voltage [B1] and discharges through the load resistor when the output voltage falls [B1], reducing ripple.',
    requiredKeywords: [
      ['capacitor charges', 'charges at peak', 'charges during peak'],
      ['discharges through load', 'discharges when voltage falls', 'maintains current during troughs'],
      ['reduces ripple', 'smoother output', 'ripple voltage'],
    ],
    examinerReportWarning:
      "Explain the charging and discharging cycle: charges up during voltage peaks and slowly discharges through the load when supply voltage drops.",
    pastPaperRef: '9702/41/O/N/20 Q8(b)',
    sampleAcceptableAnswer:
      'The capacitor charges up to peak voltage and discharges through the load resistor when the rectified supply voltage falls below the capacitor voltage, reducing fluctuations (ripple) in output potential difference.',
  },

  // ==========================================
  // TOPIC 11: Quantum Physics
  // ==========================================
  {
    id: 'quant_photon',
    topic: 'Quantum Physics',
    term: 'Photon',
    marks: 1,
    verbatimMarkScheme:
      'A quantum / packet / discrete amount of electromagnetic energy [B1] (E = hf).',
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
      'The minimum frequency of incident electromagnetic radiation required to emit electrons from the surface of a metal (f₀ = Φ / h).',
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
  {
    id: 'quant_emission_spectrum',
    topic: 'Quantum Physics',
    term: 'Line Emission Spectrum',
    marks: 2,
    verbatimMarkScheme:
      'Distinct coloured lines against a dark background [B1] formed when excited electrons drop to lower energy levels emitting photons of discrete frequencies [B1].',
    requiredKeywords: [
      ['discrete frequencies', 'specific wavelengths', 'discrete lines'],
      ['electrons de-excite', 'drop to lower energy levels', 'transition between discrete levels'],
      ['emitting photons', 'photons emitted'],
    ],
    examinerReportWarning:
      "Explain the physical origin: electrons transition from higher to lower discrete energy levels, emitting photons with energy hf = E₂ - E₁.",
    pastPaperRef: '9702/42/O/N/22 Q9(b)',
    sampleAcceptableAnswer:
      'A series of sharp, discrete coloured lines on a dark background produced when excited electrons fall between discrete atomic energy levels, emitting photons of specific energies (hf = E₁ - E₂).',
  },

  // ==========================================
  // TOPIC 12: Nuclear Physics
  // ==========================================
  {
    id: 'nuc_mass_defect',
    topic: 'Nuclear Physics',
    term: 'Mass Defect (Δm)',
    marks: 1,
    verbatimMarkScheme:
      'Difference between the total mass of the separate constituent nucleons and the mass of the bound nucleus [B1].',
    requiredKeywords: [
      ['difference between', 'total mass of separate', 'mass of individual nucleons'],
      ['constituent nucleons', 'separate nucleons', 'individual nucleons'],
      ['mass of the nucleus', 'mass of bound nucleus'],
    ],
    examinerReportWarning:
      "Difference between total mass of individual nucleons and the mass of the nucleus. Nucleon mass is always greater than nuclear mass.",
    pastPaperRef: '9702/41/M/J/22 Q10(a)',
    sampleAcceptableAnswer:
      'The difference between the total mass of the separate constituent nucleons and the combined mass of the bound nucleus (Δm = Z·m_p + N·m_n - m_nucleus).',
  },
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
      'The minimum energy required to completely separate all the constituent nucleons of a nucleus to infinity (E = Δm·c²).',
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
      'The probability per unit time of the decay of a given radioactive nucleus (λ = ln 2 / t_1/2).',
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
      "Activity = number of nuclei decaying per unit time (A = λN). Measured in Becquerels (1 Bq = 1 decay per second).",
    pastPaperRef: '9702/42/F/M/22 Q10(a)',
    sampleAcceptableAnswer:
      'The number of radioactive decays occurring per unit time in a sample (A = -dN/dt = λN).',
  },
  {
    id: 'nuc_half_life',
    topic: 'Nuclear Physics',
    term: 'Half-Life (t₁/₂)',
    marks: 1,
    verbatimMarkScheme:
      'Time taken for the number of radioactive nuclei / activity to halve [B1] (or decrease to half of its initial value).',
    requiredKeywords: [
      ['time taken', 'time for'],
      ['number of nuclei', 'activity', 'count rate', 'undecayed nuclei'],
      ['halve', 'half its initial', 'decrease to half', 'reduce by half'],
    ],
    examinerReportWarning:
      "State 'time taken for number of undecayed nuclei or activity to decrease to half of initial value'.",
    pastPaperRef: '9702/42/O/N/20 Q10(a)',
    sampleAcceptableAnswer:
      'The time taken for the number of undecayed radioactive nuclei (or the activity) in a sample to decrease to half of its original value (t_1/2 = ln 2 / λ).',
  },

  // ==========================================
  // TOPIC 13: Medical Physics & Ultrasound
  // ==========================================
  {
    id: 'med_piezoelectric',
    topic: 'Medical Physics',
    term: 'Piezoelectric Effect',
    marks: 2,
    verbatimMarkScheme:
      'Application of an alternating potential difference causes a quartz crystal to change shape / vibrate [B1], generating ultrasound waves (and vice-versa) [B1].',
    requiredKeywords: [
      ['alternating potential difference', 'p.d. across crystal', 'applied voltage', 'electric field'],
      ['crystal vibrates', 'changes shape', 'vibrates at resonant frequency'],
      ['generates ultrasound', 'produces ultrasound wave', 'sound wave'],
    ],
    examinerReportWarning:
      "State: applying alternating p.d. across opposite faces of a quartz crystal causes it to compress and expand (vibrate), emitting ultrasound.",
    pastPaperRef: '9702/42/M/J/22 Q11(a)',
    sampleAcceptableAnswer:
      'The generation of ultrasound waves when an alternating potential difference is applied across opposite faces of a piezoelectric crystal, causing it to vibrate at the frequency of the applied voltage.',
  },
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
  {
    id: 'med_linear_attenuation',
    topic: 'Medical Physics',
    term: 'Linear Attenuation Coefficient (μ)',
    marks: 2,
    verbatimMarkScheme:
      'Fraction of X-ray / radiation intensity absorbed / scattered per unit thickness [B1] of the absorbing material [B1] (I = I₀ e^(-μx)).',
    requiredKeywords: [
      ['fraction of intensity', 'fraction of beam', 'proportion of intensity'],
      ['per unit thickness', 'per unit length', 'unit distance'],
      ['absorbed', 'attenuated', 'removed'],
    ],
    examinerReportWarning:
      "Must state 'fractional decrease in intensity per unit thickness of material'.",
    pastPaperRef: '9702/41/O/N/21 Q11(a)',
    sampleAcceptableAnswer:
      'The fractional decrease in the intensity of an X-ray beam per unit thickness of the absorbing material (I = I₀ e^(-μx)).',
  },

  // ==========================================
  // TOPIC 14: Astronomy & Cosmology
  // ==========================================
  {
    id: 'astro_standard_candle',
    topic: 'Astronomy & Cosmology',
    term: 'Standard Candle',
    marks: 1,
    verbatimMarkScheme:
      'An astronomical object of known luminosity [B1].',
    requiredKeywords: [
      ['astronomical object', 'celestial object', 'star', 'stellar object'],
      ['known luminosity', 'luminosity is known'],
    ],
    examinerReportWarning:
      "Do NOT say 'known brightness' (brightness/radiant flux depends on distance). It MUST be 'known luminosity'.",
    pastPaperRef: '9702/42/M/J/22 Q12(a)',
    sampleAcceptableAnswer:
      'An astronomical object (such as a Cepheid variable or Type 1a supernova) whose luminosity is known.',
  },
  {
    id: 'astro_luminosity',
    topic: 'Astronomy & Cosmology',
    term: 'Luminosity (L)',
    marks: 1,
    verbatimMarkScheme:
      'Total radiant power emitted by an astronomical object / star [B1] (L = 4πr²σT⁴).',
    requiredKeywords: [
      ['total power', 'radiant power', 'total energy per unit time', 'total rate of energy emitted'],
      ['emitted by a star', 'emitted by star', 'emitted by object'],
    ],
    examinerReportWarning:
      "Total power emitted by a star. Measured in Watts (W = J/s).",
    pastPaperRef: '9702/41/M/J/21 Q12(a)',
    sampleAcceptableAnswer:
      'The total radiant energy emitted per unit time (total power) by a star or astronomical body.',
  },
  {
    id: 'astro_radiant_flux',
    topic: 'Astronomy & Cosmology',
    term: 'Radiant Flux Intensity (F)',
    marks: 1,
    verbatimMarkScheme:
      'Radiant power passing normally through unit area [B1] at the observer / Earth (F = L / 4πd²).',
    requiredKeywords: [
      ['power per unit area', 'radiant power per unit area', 'energy per unit time per unit area'],
      ['normally', 'perpendicular', 'at observer'],
    ],
    examinerReportWarning:
      "Radiant power per unit area passing normally through an area at distance d from the star (F = L / 4πd²).",
    pastPaperRef: '9702/42/O/N/22 Q12(a)',
    sampleAcceptableAnswer:
      'The radiant power passing perpendicularly through unit surface area at the observer (F = L / 4πd²).',
  },
  {
    id: 'astro_wiens_law',
    topic: 'Astronomy & Cosmology',
    term: "Wien's Displacement Law",
    marks: 2,
    verbatimMarkScheme:
      'The wavelength of maximum emission intensity is inversely proportional [B1] to the thermodynamic temperature of the black body [B1] (λ_max · T = constant).',
    requiredKeywords: [
      ['wavelength of maximum emission', 'peak wavelength', 'maximum intensity wavelength', 'lambda max'],
      ['inversely proportional', 'inverse of'],
      ['thermodynamic temperature', 'kelvin temperature', 'absolute temperature', 'temperature in kelvin'],
    ],
    examinerReportWarning:
      "Must state 'wavelength of MAXIMUM intensity' (not max wavelength!) is inversely proportional to 'thermodynamic (Kelvin) temperature'.",
    pastPaperRef: '9702/42/M/J/23 Q12(a)',
    sampleAcceptableAnswer:
      'The wavelength of maximum emission intensity from a black body is inversely proportional to its thermodynamic temperature (λ_max · T = 2.898 × 10⁻³ m K).',
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
  // ==========================================
  // TOPIC 15: Additional Canonical A2 Definitions
  // ==========================================
  {
    id: 'circ_centripetal_force',
    topic: 'Circular Motion',
    term: 'Centripetal Force',
    marks: 2,
    verbatimMarkScheme:
      'The resultant force acting on a body towards the centre of its circular path [B1] causing centripetal acceleration perpendicular to velocity [B1] (F = mv²/r = mrω²).',
    requiredKeywords: [
      ['resultant force', 'net force', 'total force'],
      ['towards the centre', 'towards center', 'directed inwards to centre'],
      ['perpendicular to velocity', 'perpendicular to motion', 'circular path'],
    ],
    examinerReportWarning:
      "Centripetal force is not an extra force; it is the resultant force towards the centre of the circular path.",
    pastPaperRef: '9702/42/M/J/21 Q1(a)',
    sampleAcceptableAnswer:
      'The resultant force acting on an object moving in a circle, directed towards the centre of the circle perpendicular to its velocity.',
  },
  {
    id: 'grav_field_def',
    topic: 'Gravitational Fields',
    term: 'Gravitational Field',
    marks: 1,
    verbatimMarkScheme:
      'A region of space where a mass experiences a gravitational force [B1].',
    requiredKeywords: [
      ['region of space', 'region', 'area around a mass'],
      ['mass experiences a force', 'force on a mass', 'force due to gravity'],
    ],
    examinerReportWarning:
      "A region of space where a mass experiences a force of gravitational attraction.",
    pastPaperRef: '9702/41/M/J/18 Q1(a)',
    sampleAcceptableAnswer:
      'A region of space where a mass experiences an attractive force due to gravitational interaction.',
  },
  {
    id: 'shm_damping_def',
    topic: 'Oscillations',
    term: 'Damping',
    marks: 2,
    verbatimMarkScheme:
      'Reduction in amplitude of oscillations [B1] due to resistive / frictional forces removing mechanical energy from the system [B1].',
    requiredKeywords: [
      ['reduction in amplitude', 'amplitude decreases', 'amplitude decays', 'loss of amplitude'],
      ['resistive forces', 'frictional forces', 'drag forces', 'loss of mechanical energy', 'energy dissipated'],
    ],
    examinerReportWarning:
      "Must state reduction in amplitude caused by energy removal/dissipation by resistive forces.",
    pastPaperRef: '9702/42/O/N/20 Q2(b)',
    sampleAcceptableAnswer:
      'The continuous reduction in amplitude of oscillations over time caused by resistive or frictional forces dissipating mechanical energy as thermal energy.',
  },
  {
    id: 'shm_natural_frequency',
    topic: 'Oscillations',
    term: 'Natural Frequency',
    marks: 1,
    verbatimMarkScheme:
      'The frequency at which an oscillator vibrates when allowed to oscillate freely after being displaced [B1].',
    requiredKeywords: [
      ['frequency of free oscillation', 'oscillates freely', 'vibrates freely', 'unforced oscillation', 'natural frequency'],
    ],
    examinerReportWarning:
      "The frequency at which an object oscillates when no external periodic driving force is applied.",
    pastPaperRef: '9702/41/M/J/19 Q2(a)',
    sampleAcceptableAnswer:
      'The frequency at which a system oscillates freely in the absence of any external driving or damping forces.',
  },
  {
    id: 'shm_forced_oscillations',
    topic: 'Oscillations',
    term: 'Forced Oscillations',
    marks: 1,
    verbatimMarkScheme:
      'Oscillations produced and sustained by a continuous periodic external driving force [B1].',
    requiredKeywords: [
      ['periodic external force', 'external driving force', 'continuous driving force', 'driving frequency'],
    ],
    examinerReportWarning:
      "Oscillations produced when a system is subjected to a continuous periodic driving force.",
    pastPaperRef: '9702/42/M/J/17 Q3(a)',
    sampleAcceptableAnswer:
      'Oscillations occurring when a vibrating system is continuously driven by an external periodic force at the frequency of the driver.',
  },
  {
    id: 'shm_phase_difference',
    topic: 'Oscillations',
    term: 'Phase Difference',
    marks: 2,
    verbatimMarkScheme:
      'The fraction of an oscillation or angle by which two oscillating systems are out of step [B1] measured in radians or degrees [B1] (Δφ = 2πΔt / T).',
    requiredKeywords: [
      ['fraction of an oscillation', 'angle', 'out of step', 'time delay as fraction of period'],
      ['radians or degrees', 'rad', '2pi delta t / T'],
    ],
    examinerReportWarning:
      "Measure of how out of step two oscillations or waves are, quantified in radians or degrees.",
    pastPaperRef: '9702/41/O/N/19 Q2(a)',
    sampleAcceptableAnswer:
      'The measure of how much one wave or oscillation is out of step with another, expressed as an angle in radians or degrees (Δφ = 2π Δt / T).',
  },
  {
    id: 'therm_heat_capacity',
    topic: 'Thermal Physics',
    term: 'Heat Capacity (C)',
    marks: 1,
    verbatimMarkScheme:
      'Thermal energy required to raise the temperature of the entire body by one unit of temperature (1 K or 1 °C) [B1] (C = mc = ΔQ/Δθ).',
    requiredKeywords: [
      ['thermal energy required', 'energy needed', 'heat energy required'],
      ['entire body', 'whole object', 'an object'],
      ['one kelvin', 'one degree', 'unit temperature rise', '1 K'],
    ],
    examinerReportWarning:
      "Do NOT include 'per unit mass' for heat capacity C! 'Per unit mass' is SPECIFIC heat capacity.",
    pastPaperRef: '9702/42/M/J/18 Q2(a)',
    sampleAcceptableAnswer:
      'The thermal energy required to raise the temperature of a whole body by one kelvin (or 1 °C).',
  },
  {
    id: 'therm_latent_heat_fusion',
    topic: 'Thermal Physics',
    term: 'Specific Latent Heat of Fusion (Lf)',
    marks: 2,
    verbatimMarkScheme:
      'Thermal energy per unit mass required to change the state of a substance from solid to liquid [B1] without any change in temperature [B1].',
    requiredKeywords: [
      ['thermal energy per unit mass', 'energy per unit mass', 'energy per kg', 'heat per kilogram'],
      ['solid to liquid', 'melting'],
      ['without change in temperature', 'constant temperature', 'at constant temperature'],
    ],
    examinerReportWarning:
      "Must state 'per unit mass' and explicitly include 'without change in temperature'.",
    pastPaperRef: '9702/41/O/N/20 Q3(a)',
    sampleAcceptableAnswer:
      'The thermal energy per unit mass required to convert a substance from solid to liquid state at its melting point without any change in temperature.',
  },
  {
    id: 'therm_latent_heat_vapour',
    topic: 'Thermal Physics',
    term: 'Specific Latent Heat of Vaporisation (Lv)',
    marks: 2,
    verbatimMarkScheme:
      'Thermal energy per unit mass required to change the state of a substance from liquid to gas/vapour [B1] without any change in temperature [B1].',
    requiredKeywords: [
      ['thermal energy per unit mass', 'energy per unit mass', 'energy per kg', 'heat per kilogram'],
      ['liquid to gas', 'liquid to vapour', 'boiling'],
      ['without change in temperature', 'constant temperature', 'at constant temperature'],
    ],
    examinerReportWarning:
      "Must include 'per unit mass' and 'without change of temperature' (at boiling point).",
    pastPaperRef: '9702/42/M/J/19 Q2(a)',
    sampleAcceptableAnswer:
      'The thermal energy required per unit mass to change a substance from liquid to gas at constant temperature.',
  },
  {
    id: 'gas_boyles_law',
    topic: 'Ideal Gases',
    term: "Boyle's Law",
    marks: 2,
    verbatimMarkScheme:
      'For a fixed mass of gas at constant temperature [B1], pressure is inversely proportional to volume [B1] (pV = constant).',
    requiredKeywords: [
      ['fixed mass', 'constant mass', 'certain mass'],
      ['constant temperature', 'fixed temperature'],
      ['pressure inversely proportional to volume', 'p inversely proportional to v', 'pv is constant'],
    ],
    examinerReportWarning:
      "Must state the conditions: 'for a fixed mass of gas' AND 'at constant temperature'.",
    pastPaperRef: '9702/41/M/J/20 Q2(a)',
    sampleAcceptableAnswer:
      'For a fixed mass of gas at constant temperature, pressure is inversely proportional to volume (pV = constant).',
  },
  {
    id: 'gas_charles_law',
    topic: 'Ideal Gases',
    term: "Charles's Law",
    marks: 2,
    verbatimMarkScheme:
      'For a fixed mass of gas at constant pressure [B1], volume is directly proportional to thermodynamic (Kelvin) temperature [B1] (V ∝ T).',
    requiredKeywords: [
      ['fixed mass', 'constant mass'],
      ['constant pressure', 'fixed pressure'],
      ['volume directly proportional to thermodynamic temperature', 'volume proportional to kelvin temperature', 'v proportional to t'],
    ],
    examinerReportWarning:
      "Must specify 'thermodynamic / Kelvin temperature' (not Celsius!).",
    pastPaperRef: '9702/42/O/N/18 Q2(a)',
    sampleAcceptableAnswer:
      'For a fixed mass of gas at constant pressure, its volume is directly proportional to its thermodynamic (Kelvin) temperature (V/T = constant).',
  },
  {
    id: 'gas_rms_speed',
    topic: 'Ideal Gases',
    term: 'Root-Mean-Square Speed (c_rms)',
    marks: 1,
    verbatimMarkScheme:
      'The square root of the mean of the squares of the speeds of the gas molecules [B1] (c_rms = √<c²>).',
    requiredKeywords: [
      ['square root of the mean of the squares of the speeds', 'square root of mean square speed', 'root of mean square speed', 'c_rms = sqrt(<c^2>)'],
    ],
    examinerReportWarning:
      "Do NOT confuse root-mean-square speed with average / mean speed! It is the square root of the mean of the squared speeds.",
    pastPaperRef: '9702/42/M/J/22 Q2(b)',
    sampleAcceptableAnswer:
      'The square root of the mean value of the squares of the speeds of all gas molecules (c_rms = √<c²>).',
  },
  {
    id: 'elec_field_def',
    topic: 'Electric Fields',
    term: 'Electric Field',
    marks: 1,
    verbatimMarkScheme:
      'A region of space where a stationary electric charge experiences an electrostatic force [B1].',
    requiredKeywords: [
      ['region of space', 'region'],
      ['charge experiences a force', 'electric force on a charge', 'force on charged particle'],
    ],
    examinerReportWarning:
      "A region of space where an electric charge experiences a force.",
    pastPaperRef: '9702/41/M/J/21 Q6(a)',
    sampleAcceptableAnswer:
      'A region of space where a charged particle experiences an electrostatic force.',
  },
  {
    id: 'elec_equipotential_surface',
    topic: 'Electric Fields',
    term: 'Equipotential Surface',
    marks: 2,
    verbatimMarkScheme:
      'A surface where all points have the same electric potential [B1] so that no work is done moving a charge along the surface [B1].',
    requiredKeywords: [
      ['same electric potential', 'constant electric potential', 'same potential at all points'],
      ['no work done', 'zero work done moving a charge', 'perpendicular to field lines'],
    ],
    examinerReportWarning:
      "Electric field lines are always at 90° (perpendicular) to equipotential surfaces; no work is done along them.",
    pastPaperRef: '9702/42/O/N/21 Q6(b)',
    sampleAcceptableAnswer:
      'A surface joining points of equal electric potential, along which no work is done moving a test charge.',
  },
  {
    id: 'cap_dielectric_permittivity',
    topic: 'Capacitance',
    term: 'Relative Permittivity (εr)',
    marks: 1,
    verbatimMarkScheme:
      'The ratio of the capacitance of a capacitor with the dielectric to the capacitance with vacuum/air [B1] (εr = C / C₀ = ε / ε₀).',
    requiredKeywords: [
      ['ratio of capacitance with dielectric to capacitance with vacuum', 'ratio of permittivity of medium to permittivity of free space', 'c / c0', 'epsilon / epsilon0'],
    ],
    examinerReportWarning:
      "Ratio of capacitance with material between plates to capacitance with vacuum (or ε/ε₀). Dimensionless.",
    pastPaperRef: '9702/41/M/J/22 Q6(a)',
    sampleAcceptableAnswer:
      'The ratio of the permittivity of a dielectric medium to the permittivity of free space (εr = ε / ε₀ = C / C₀).',
  },
  {
    id: 'mag_field_def',
    topic: 'Magnetic Fields',
    term: 'Magnetic Field',
    marks: 1,
    verbatimMarkScheme:
      'A region of space where a moving charge or permanent magnet / current-carrying conductor experiences a magnetic force [B1].',
    requiredKeywords: [
      ['region of space', 'region'],
      ['moving charge', 'current carrying conductor', 'magnetic pole'],
      ['experiences a magnetic force', 'force on moving charge'],
    ],
    examinerReportWarning:
      "Must state that a MOVING charge or current experiences a force (stationary charges experience no magnetic force).",
    pastPaperRef: '9702/42/M/J/20 Q7(a)',
    sampleAcceptableAnswer:
      'A region of space where a moving charge or magnetic dipole experiences a magnetic force.',
  },
  {
    id: 'em_induction_def',
    topic: 'Electromagnetic Induction',
    term: 'Electromagnetic Induction',
    marks: 1,
    verbatimMarkScheme:
      'The generation of an electromotive force (e.m.f.) across a conductor when there is a change in magnetic flux linkage through the circuit [B1].',
    requiredKeywords: [
      ['generation of emf', 'induced emf', 'production of emf'],
      ['change in magnetic flux linkage', 'rate of change of flux linkage', 'cutting magnetic flux lines'],
    ],
    examinerReportWarning:
      "Induction of an electromotive force (emf) caused by changing magnetic flux linkage.",
    pastPaperRef: '9702/41/O/N/20 Q7(a)',
    sampleAcceptableAnswer:
      'The phenomenon of generating an electromotive force across a conductor when the magnetic flux linkage through it changes with time.',
  },
  {
    id: 'em_eddy_currents',
    topic: 'Electromagnetic Induction',
    term: 'Eddy Currents',
    marks: 2,
    verbatimMarkScheme:
      'Induced circulating electric currents in a bulk metal/conductor [B1] caused by changing magnetic flux linkage [B1] (which produce thermal energy and oppose relative motion by Lenz’s law).',
    requiredKeywords: [
      ['induced circulating currents', 'circulating currents in a conductor', 'loops of current'],
      ['bulk conductor', 'bulk metal', 'solid metal'],
      ['changing magnetic flux', 'changing magnetic field'],
    ],
    examinerReportWarning:
      "Circulating currents induced in bulk conductors that cause resistive heating; reduced by laminating transformer cores.",
    pastPaperRef: '9702/42/M/J/18 Q7(b)',
    sampleAcceptableAnswer:
      'Circulating loops of electrical current induced within bulk conductors by a changing magnetic field, causing resistive energy dissipation.',
  },
  {
    id: 'ac_rectification_types',
    topic: 'Alternating Currents',
    term: 'Half-Wave vs Full-Wave Rectification',
    marks: 2,
    verbatimMarkScheme:
      'Half-wave transmits only one half of each AC cycle using a single diode [B1]. Full-wave inverts the negative half-cycles so current flows in the same direction throughout the entire cycle [B1] (e.g. using a 4-diode bridge rectifier).',
    requiredKeywords: [
      ['half-wave transmits only one half of cycle', 'half wave single diode'],
      ['full-wave inverts negative half', 'both halves of ac cycle converted', 'bridge rectifier of four diodes', 'continuous direct current'],
    ],
    examinerReportWarning:
      "Contrast clearly: Half-wave conducts on alternate half cycles; Full-wave conducts on both half cycles yielding unidirectional current.",
    pastPaperRef: '9702/41/M/J/19 Q8(a)',
    sampleAcceptableAnswer:
      'Half-wave rectification allows current in only one half of the AC cycle; full-wave rectification converts both positive and negative halves of the AC cycle into unidirectional current using a four-diode bridge rectifier.',
  },
  {
    id: 'quant_stopping_potential',
    topic: 'Quantum Physics',
    term: 'Stopping Potential (Vs)',
    marks: 2,
    verbatimMarkScheme:
      'The minimum potential difference applied between electrodes [B1] to reduce the photoelectric current to zero (eVs = 1/2 m v_max²) [B1].',
    requiredKeywords: [
      ['minimum potential difference', 'minimum voltage', 'opposing voltage', 'retarding potential'],
      ['reduce photoelectric current to zero', 'photoelectric current becomes zero', 'stop most energetic photoelectrons', 'ev_s = 1/2 m v_max^2'],
    ],
    examinerReportWarning:
      "Must state minimum potential difference to stop the most energetic photoelectrons (current falls to zero).",
    pastPaperRef: '9702/42/O/N/19 Q9(a)',
    sampleAcceptableAnswer:
      'The minimum negative potential difference applied to the collector plate that reduces the photoelectric current to zero by halting the most energetic emitted electrons (e Vs = 1/2 m v_max²).',
  },
  {
    id: 'quant_energy_levels',
    topic: 'Quantum Physics',
    term: 'Quantised Energy Levels',
    marks: 1,
    verbatimMarkScheme:
      'Discrete, specific energy values that an electron or atom is allowed to have [B1].',
    requiredKeywords: [
      ['discrete energy values', 'specific energy values', 'only certain allowed energies', 'quantised energy states'],
    ],
    examinerReportWarning:
      "Electrons in isolated atoms can only exist in discrete, quantised energy states, not continuous values.",
    pastPaperRef: '9702/41/M/J/22 Q9(a)',
    sampleAcceptableAnswer:
      'Discrete and specific energy values that an electron bound inside an atom is allowed to possess.',
  },
  {
    id: 'nuc_fission_def',
    topic: 'Nuclear Physics',
    term: 'Nuclear Fission',
    marks: 2,
    verbatimMarkScheme:
      'The splitting of a heavy, massive nucleus [B1] into two lighter daughter nuclei of roughly equal mass with the release of neutrons and energy [B1].',
    requiredKeywords: [
      ['splitting of a heavy nucleus', 'massive nucleus splits', 'large nucleus breaks'],
      ['two lighter nuclei', 'daughter nuclei of comparable mass'],
      ['release of energy', 'release of neutrons'],
    ],
    examinerReportWarning:
      "Must state 'splitting of a heavy nucleus into two lighter nuclei of comparable mass'.",
    pastPaperRef: '9702/42/M/J/21 Q10(a)',
    sampleAcceptableAnswer:
      'The splitting of a massive, heavy nucleus (such as U-235) into two smaller nuclei of roughly comparable masses with the emission of neutrons and energy.',
  },
  {
    id: 'nuc_fusion_def',
    topic: 'Nuclear Physics',
    term: 'Nuclear Fusion',
    marks: 2,
    verbatimMarkScheme:
      'The joining together of two light nuclei [B1] to form a single heavier nucleus with the release of energy [B1].',
    requiredKeywords: [
      ['joining together of two light nuclei', 'two light nuclei combine', 'light nuclei fuse'],
      ['form a heavier nucleus', 'single heavier nucleus'],
      ['release of energy', 'energy is released'],
    ],
    examinerReportWarning:
      "Must state 'combining two light nuclei to form a heavier nucleus' (e.g. deuterium + tritium -> helium + neutron).",
    pastPaperRef: '9702/41/O/N/21 Q10(a)',
    sampleAcceptableAnswer:
      'The process where two light nuclei join together to form a heavier, more stable nucleus with the release of binding energy.',
  },
  {
    id: 'nuc_spontaneous_random',
    topic: 'Nuclear Physics',
    term: 'Spontaneous and Random Nature of Radioactive Decay',
    marks: 2,
    verbatimMarkScheme:
      'Spontaneous: Decay is not affected by external factors such as temperature, pressure, or chemical bonding [B1].\nRandom: It is impossible to predict which nucleus will decay next or when a particular nucleus will decay, though probability of decay per unit time is constant [B1].',
    requiredKeywords: [
      ['spontaneous: not affected by external factors', 'not affected by temperature or pressure', 'unaffected by environment'],
      ['random: cannot predict which nucleus or when', 'impossible to predict next decay', 'constant probability of decay per unit time'],
    ],
    examinerReportWarning:
      "Examiners require distinct definitions: Spontaneous = unaffected by external factors; Random = unpredictable which or when.",
    pastPaperRef: '9702/42/M/J/20 Q10(a)',
    sampleAcceptableAnswer:
      'Spontaneous means decay is unaffected by external environmental factors (temperature, pressure). Random means it is impossible to predict which nucleus decays or the precise time of decay, with a constant decay probability per unit time.',
  },
  {
    id: 'nuc_becquerel_def',
    topic: 'Nuclear Physics',
    term: 'The Becquerel (Bq)',
    marks: 1,
    verbatimMarkScheme:
      'One radioactive decay or disintegration per second [B1] (1 Bq = 1 s⁻¹).',
    requiredKeywords: [
      ['one decay per second', 'one disintegration per second', 'decays per second', '1 disintegration / second'],
    ],
    examinerReportWarning:
      "1 Becquerel = 1 decay per second (s⁻¹). Do NOT say counts per second (counts depend on detector efficiency and distance).",
    pastPaperRef: '9702/41/M/J/20 Q10(a)',
    sampleAcceptableAnswer:
      'The SI unit of radioactive activity, corresponding to exactly one decay (disintegration) per second (1 Bq = 1 s⁻¹).',
  },
  {
    id: 'nuc_binding_energy_per_nucleon',
    topic: 'Nuclear Physics',
    term: 'Binding Energy per Nucleon',
    marks: 2,
    verbatimMarkScheme:
      'The total binding energy of a nucleus divided by its nucleon number (mass number A) [B1]; represents the measure of nuclear stability [B1].',
    requiredKeywords: [
      ['total binding energy divided by nucleon number', 'binding energy per nucleon', 'binding energy / a'],
      ['measure of nuclear stability', 'indicator of stability'],
    ],
    examinerReportWarning:
      "The highest binding energy per nucleon occurs at Iron-56 (~8.8 MeV/nucleon). Fission and fusion both move nuclides towards Fe-56.",
    pastPaperRef: '9702/42/O/N/22 Q10(b)',
    sampleAcceptableAnswer:
      'The total binding energy of a nucleus divided by the number of nucleons (A) in the nucleus; it serves as a direct quantitative measure of nuclear stability.',
  },
  {
    id: 'med_half_value_thickness',
    topic: 'Medical Physics',
    term: 'Half-Value Thickness (HVT or x₁/₂)',
    marks: 2,
    verbatimMarkScheme:
      'The thickness of absorbing material required to reduce the transmitted intensity of radiation by half [B1] (x₁/₂ = ln(2) / μ) [B1].',
    requiredKeywords: [
      ['thickness of material required to reduce intensity by half', 'thickness to halve intensity', 'thickness where intensity becomes i0/2'],
      ['x1/2 = ln 2 / mu', 'ln(2) / mu', 'attenuation'],
    ],
    examinerReportWarning:
      "Must state 'thickness of material to reduce intensity of radiation by half' (x₁/₂ = ln 2 / μ).",
    pastPaperRef: '9702/41/O/N/22 Q11(a)',
    sampleAcceptableAnswer:
      'The thickness of an absorbing medium needed to reduce the intensity of incident ultrasound or X-ray radiation to half its original value (x₁/₂ = ln(2) / μ).',
  },
  {
    id: 'med_intensity_reflection_coeff',
    topic: 'Medical Physics',
    term: 'Intensity Reflection Coefficient (α)',
    marks: 2,
    verbatimMarkScheme:
      'The ratio of reflected wave intensity to incident wave intensity at a boundary [B1] given by α = (Z₂ - Z₁)² / (Z₂ + Z₁)² [B1].',
    requiredKeywords: [
      ['ratio of reflected intensity to incident intensity', 'i_r / i_0', 'reflected intensity / incident intensity'],
      ['(z2 - z1)^2 / (z2 + z1)^2', 'acoustic impedance boundary formula'],
    ],
    examinerReportWarning:
      "Ratio of reflected intensity to incident intensity at the interface between media of acoustic impedances Z₁ and Z₂.",
    pastPaperRef: '9702/42/M/J/22 Q11(a)',
    sampleAcceptableAnswer:
      'The ratio of the reflected intensity to the incident intensity of an ultrasound beam at a boundary between two acoustic media (α = Ir / I₀ = (Z₂ - Z₁)² / (Z₂ + Z₁)²).',
  },
  {
    id: 'med_ct_scan',
    topic: 'Medical Physics',
    term: 'Computed Tomography (CT Scanning)',
    marks: 2,
    verbatimMarkScheme:
      'Multiple X-ray measurements taken from many angles in a slice [B1] processed by computer software to reconstruct a 3D or 2D cross-sectional image of internal tissues (using voxels / pixels) [B1].',
    requiredKeywords: [
      ['multiple x-ray measurements from many angles', 'x-ray tube rotates around patient', 'x-rays from different directions'],
      ['computer reconstructs cross-sectional slice', 'reconstruct 3d image', 'voxel', 'pixel attenuation values'],
    ],
    examinerReportWarning:
      "Must mention rotation of X-ray source around patient and computer image reconstruction from multiple angles.",
    pastPaperRef: '9702/41/M/J/23 Q11(a)',
    sampleAcceptableAnswer:
      'An imaging procedure where an X-ray source and detector rotate around the patient, taking absorption readings from multiple angles that a computer reconstructs into cross-sectional slice images using voxels.',
  },
  {
    id: 'med_pet_annihilation',
    topic: 'Medical Physics',
    term: 'PET Scanning & Pair Annihilation',
    marks: 2,
    verbatimMarkScheme:
      'A positron emitted by a radioactive tracer collides with an atomic electron and annihilates [B1] producing two gamma-ray photons travelling in opposite directions (antiparallel, each of 511 keV) [B1].',
    requiredKeywords: [
      ['positron annihilates with an electron', 'positron and electron annihilate', 'pair annihilation'],
      ['two gamma photons in opposite directions', 'antiparallel gamma rays', 'two gamma rays emitted at 180 degrees', '511 kev'],
    ],
    examinerReportWarning:
      "Must state: positron annihilates with electron, emitting two gamma photons in opposite directions detected by ring detector.",
    pastPaperRef: '9702/42/O/N/23 Q11(a)',
    sampleAcceptableAnswer:
      'In PET scanning, a positron emitted by a radiotracer collides with an electron and annihilates, converting their mass into two 511 keV gamma-ray photons emitted in opposite directions (antiparallel, 180° apart).',
  },
  {
    id: 'astro_stefan_boltzmann',
    topic: 'Astronomy & Cosmology',
    term: 'Stefan-Boltzmann Law',
    marks: 2,
    verbatimMarkScheme:
      'The total radiant power / luminosity emitted per unit surface area of a black body is directly proportional to the fourth power of its thermodynamic temperature [B1] (L = 4πr² σ T⁴) [B1].',
    requiredKeywords: [
      ['luminosity proportional to fourth power of temperature', 'power per unit area proportional to t^4', 'radiant power directly proportional to t^4'],
      ['thermodynamic temperature', 'kelvin temperature', 'l = 4 pi r^2 sigma t^4'],
    ],
    examinerReportWarning:
      "Must state directly proportional to FOURTH power of THERMODYNAMIC (Kelvin) temperature (T⁴).",
    pastPaperRef: '9702/42/M/J/23 Q12(b)',
    sampleAcceptableAnswer:
      'The total power radiated per unit surface area of a black body is directly proportional to the fourth power of its thermodynamic temperature (L = 4πr² σ T⁴).',
  },
  {
    id: 'astro_redshift_def',
    topic: 'Astronomy & Cosmology',
    term: 'Cosmological Redshift (z)',
    marks: 2,
    verbatimMarkScheme:
      'The apparent fractional increase in the wavelength of light from distant galaxies [B1] caused by the expansion of space itself as photons travel towards Earth (z = Δλ / λ ≈ v / c) [B1].',
    requiredKeywords: [
      ['fractional increase in wavelength', 'wavelength shifts to longer wavelengths', 'delta lambda / lambda'],
      ['expansion of space', 'receding galaxies', 'v / c'],
    ],
    examinerReportWarning:
      "Distinguish from Doppler shift: Cosmological redshift is the stretching of light wavelengths by the continuous expansion of space.",
    pastPaperRef: '9702/41/O/N/22 Q12(a)',
    sampleAcceptableAnswer:
      'The fractional increase in the observed wavelength of spectral lines emitted by distant astronomical objects caused by the expansion of space (z = Δλ / λ ≈ v / c).',
  },
  {
    id: 'astro_big_bang_def',
    topic: 'Astronomy & Cosmology',
    term: 'The Big Bang Theory',
    marks: 2,
    verbatimMarkScheme:
      'The theory that the Universe originated from an extremely hot, dense point (singularity) [B1] and has been continuously expanding and cooling ever since [B1].',
    requiredKeywords: [
      ['universe originated from a single hot dense point', 'infinitely dense and hot point', 'singularity'],
      ['expanding and cooling ever since', 'continuous expansion of space', 'expansion of the universe'],
    ],
    examinerReportWarning:
      "The Universe originated from an extremely hot, dense singularity approximately 13.8 billion years ago and continues to expand.",
    pastPaperRef: '9702/42/M/J/21 Q12(b)',
    sampleAcceptableAnswer:
      'The model of cosmic evolution in which the Universe began from an infinitely dense, hot singularity approximately 13.8 billion years ago and has been expanding and cooling ever since.',
  },
];

