import { QuestionPart, Paper4Question } from './paper4Types';
import { PAPER_4_QUESTIONS_PART2 } from './paper4QuestionsPart2';

export type { QuestionPart, Paper4Question };

const INITIAL_PAPER_4_QUESTIONS: Paper4Question[] = [
  // --- Q1: Gravitational Fields ---
  {
    id: 'p4_q1_gravitation',
    topic: 'Gravitational Fields',
    title: 'Q1. Gravitational Fields and Orbital Mechanics',
    totalMarks: 9,
    context:
      'A spherical isolated planet of mass M and radius R has gravitational potential V = -GM/r at a distance r from its centre. A satellite of mass m is placed into circular orbit of radius r around the planet.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State what is meant by gravitational potential at a point in a field.',
        marks: 2,
        markScheme:
          'Work done per unit mass [B1]\nin bringing a point mass from infinity to the point [B1].',
        modelAnswer:
          'The work done per unit mass in bringing a small point mass from infinity to the point.',
        keyPoints: ['work done per unit mass', 'from infinity to the point'],
        examinerNotes:
          "Examiners reject 'energy required' unless qualified as work done per unit mass. 'From infinity' must not be omitted.",
      },
      {
        partId: '(b)(i)',
        questionText:
          'Show that the orbital speed v of the satellite in a circular orbit of radius r is given by v = √(GM / r).',
        marks: 2,
        markScheme:
          'Gravitational force provides the required centripetal force: GMm / r² = mv² / r [M1]\nRearrangement giving v² = GM / r, hence v = √(GM / r) [A1].',
        modelAnswer:
          'The gravitational force of attraction provides the centripetal force:\n(G M m) / r² = (m v²) / r\nDividing by m and multiplying by r:\nv² = (G M) / r  =>  v = √(G M / r)',
        keyPoints: ['GMm/r² = mv²/r', 'centripetal force provided by gravitational force'],
        examinerNotes:
          'Must show equating gravitational force formula to centripetal force formula with mass m explicitly cancelling.',
      },
      {
        partId: '(b)(ii)',
        questionText:
          'Show that the total mechanical energy E of the orbiting satellite is given by E = -GMm / (2r).',
        marks: 2,
        markScheme:
          'Kinetic energy Ek = 1/2 m v² = GMm / (2r) [C1]\nPotential energy Ep = -GMm / r [C1]\nTotal energy E = Ek + Ep = GMm / (2r) - GMm / r = -GMm / (2r) [A1].',
        modelAnswer:
          'Ek = 1/2 m v² = 1/2 m (GM/r) = + GMm / (2r)\nEp = m Vg = - GMm / r\nTotal mechanical energy E = Ek + Ep = GMm / (2r) - GMm / r = - GMm / (2r)',
        keyPoints: ['Ek = GMm/(2r)', 'Ep = -GMm/r', 'E = -GMm/(2r)'],
        examinerNotes:
          'Potential energy is negative. A common error is writing Ep as positive and obtaining +3GMm/(2r).',
      },
      {
        partId: '(c)',
        questionText:
          'The planet has mass M = 6.42 × 10²³ kg and radius R = 3.39 × 10⁶ m. Calculate the minimum escape speed required from the surface of the planet. (G = 6.67 × 10⁻¹¹ N m² kg⁻²)',
        marks: 3,
        markScheme:
          'Conservation of energy: 1/2 m v_esc² - GMm / R = 0 [C1]\nv_esc = √(2GM / R) [C1]\n= √[(2 × 6.67 × 10⁻¹¹ × 6.42 × 10²³) / (3.39 × 10⁶)] = 5.03 × 10³ m s⁻¹ [A1].',
        modelAnswer:
          '1/2 m v_esc² = GMm / R  =>  v_esc = √(2GM / R)\nv_esc = √[(2 × 6.67 × 10⁻¹¹ × 6.42 × 10²³) / (3.39 × 10⁶)] = 5.03 × 10³ m s⁻¹.',
        keyPoints: ['v_esc = √(2GM/R)', '5.03 × 10³ m s⁻¹'],
        examinerNotes:
          'Answer must be to 3 significant figures matching the given data.',
        calculatedAnswer: {
          value: '5.03e3',
          unit: 'm s⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q2: Simple Harmonic Motion ---
  {
    id: 'p4_q2_shm',
    topic: 'Oscillations',
    title: 'Q2. Simple Harmonic Motion of Piston in Engine',
    totalMarks: 8,
    context:
      'A piston of mass 0.250 kg in an engine undergoes simple harmonic motion with amplitude x₀ = 4.50 × 10⁻² m and frequency f = 25.0 Hz.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State the defining condition for an oscillation to be simple harmonic.',
        marks: 2,
        markScheme:
          'Acceleration is directly proportional to displacement [B1] and is directed towards a fixed point / opposite direction to displacement [B1].',
        modelAnswer:
          'The acceleration is directly proportional to displacement from a fixed point and is always directed towards that fixed point.',
        keyPoints: ['acceleration directly proportional to displacement', 'directed towards fixed point'],
        examinerNotes:
          "Must state 'acceleration' and 'displacement'. Stating 'force is proportional to distance' loses marks.",
      },
      {
        partId: '(b)(i)',
        questionText:
          'Calculate the maximum acceleration a_max of the piston.',
        marks: 2,
        markScheme:
          'ω = 2πf = 2π × 25.0 = 157.1 rad s⁻¹ [C1]\na_max = ω² x₀ = (157.1)² × (4.50 × 10⁻²) = 1.11 × 10³ m s⁻² [A1].',
        modelAnswer:
          'ω = 2πf = 157.08 rad s⁻¹\na_max = ω² x₀ = (157.08)² × (0.0450) = 1.11 × 10³ m s⁻².',
        keyPoints: ['ω = 2πf', 'a_max = ω² x₀', '1.11 × 10³ m s⁻²'],
        examinerNotes: 'Check units: m s⁻².',
        calculatedAnswer: {
          value: '1.11e3',
          unit: 'm s⁻²',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)(ii)',
        questionText:
          'Calculate the maximum kinetic energy E_k of the piston.',
        marks: 2,
        markScheme:
          'v_max = ω x₀ = 157.1 × (4.50 × 10⁻²) = 7.07 m s⁻¹ [C1]\nE_k = 1/2 m v_max² = 1/2 × 0.250 × (7.07)² = 6.25 J [A1].',
        modelAnswer:
          'v_max = ω x₀ = 7.07 m s⁻¹\nE_k(max) = 1/2 m v_max² = 1/2 × 0.250 × (7.07)² = 6.25 J.',
        keyPoints: ['v_max = ω x₀', 'Ek = 1/2 m v_max²', '6.25 J'],
        examinerNotes: '6.25 J.',
        calculatedAnswer: {
          value: '6.25',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'State what is meant by resonance and describe how damping affects the resonance curve.',
        marks: 2,
        markScheme:
          'Resonance: Driving frequency matches natural frequency resulting in maximum amplitude [B1]\nDamping causes peak amplitude to decrease and shifts peak to slightly lower frequency / flattens curve [B1].',
        modelAnswer:
          'Resonance occurs when the driving frequency equals the natural frequency of the oscillating system, producing vibrations of maximum amplitude. Damping flattens the resonance curve, lowers the peak amplitude, and broadens the frequency response.',
        keyPoints: ['driving frequency matches natural frequency', 'peak amplitude decreases / flattens'],
        examinerNotes: 'Common 2-mark theory question in CIE Paper 4.',
      },
    ],
  },

  // --- Q3: Capacitance ---
  {
    id: 'p4_q3_capacitance',
    topic: 'Capacitance',
    title: 'Q3. Capacitor Discharging Through Resistor',
    totalMarks: 9,
    context:
      'A capacitor of capacitance C = 470 μF is charged to potential difference V₀ = 12.0 V and discharged through a resistor R = 150 kΩ.',
    parts: [
      {
        partId: '(a)',
        questionText: 'Define capacitance.',
        marks: 1,
        markScheme:
          'Charge stored on one plate per unit potential difference between plates [B1] (C = Q/V).',
        modelAnswer: 'Charge stored per unit potential difference between the plates (C = Q/V).',
        keyPoints: ['charge per unit potential difference', 'Q/V'],
        examinerNotes: "Must state 'charge per unit potential difference'.",
      },
      {
        partId: '(b)(i)',
        questionText: 'Calculate the time constant τ of the discharging circuit.',
        marks: 2,
        markScheme:
          'τ = RC = (150 × 10³ Ω) × (470 × 10⁻⁶ F) [C1] = 70.5 s [A1].',
        modelAnswer: 'τ = R × C = (150 × 10³ Ω) × (470 × 10⁻⁶ F) = 70.5 s.',
        keyPoints: ['τ = RC', '70.5 s'],
        examinerNotes: '70.5 s (or 71 s).',
        calculatedAnswer: {
          value: '70.5',
          unit: 's',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)(ii)',
        questionText:
          'Calculate the time t taken for potential difference to decrease from 12.0 V to 3.00 V.',
        marks: 3,
        markScheme:
          'V = V₀ e^(-t/RC) => 3.00 = 12.0 e^(-t/70.5) [C1]\nln(0.250) = -t / 70.5 [C1]\nt = 70.5 × 1.386 = 97.7 s [A1].',
        modelAnswer:
          'V = V₀ e^(-t/τ)  =>  3.00 / 12.0 = e^(-t/70.5)  =>  ln(0.250) = -t/70.5  =>  t = 97.7 s.',
        keyPoints: ['V = V₀ e^(-t/RC)', '97.7 s'],
        examinerNotes: '97.7 s (to 3 s.f.).',
        calculatedAnswer: {
          value: '97.7',
          unit: 's',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the electrical energy dissipated in the resistor as V falls from 12.0 V to 3.00 V.',
        marks: 3,
        markScheme:
          'Initial E₁ = 1/2 C V₁² = 1/2 × (470 × 10⁻⁶) × (12.0)² = 3.384 × 10⁻² J [C1]\nFinal E₂ = 1/2 C V₂² = 1/2 × (470 × 10⁻⁶) × (3.00)² = 2.115 × 10⁻³ J [C1]\nΔE = E₁ - E₂ = 3.17 × 10⁻² J [A1].',
        modelAnswer:
          'ΔE = 1/2 C (V₁² - V₂²) = 1/2 × (470 × 10⁻⁶) × (144 - 9) = 3.17 × 10⁻² J (31.7 mJ).',
        keyPoints: ['ΔE = 1/2 C (V₁² - V₂²)', '3.17 × 10⁻² J'],
        examinerNotes: 'Do NOT square (V₁ - V₂)! Must be (V₁² - V₂²).',
        calculatedAnswer: {
          value: '3.17e-2',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q4: Electromagnetic Induction ---
  {
    id: 'p4_q4_induction',
    topic: 'Electromagnetic Induction',
    title: 'Q4. Rotating Coil in Uniform Magnetic Field',
    totalMarks: 9,
    context:
      'A flat coil of N = 250 turns and cross-sectional area A = 4.20 × 10⁻³ m² rotates at constant frequency f in a uniform magnetic field of flux density B = 0.160 T.',
    parts: [
      {
        partId: '(a)',
        questionText: "State Faraday's law of electromagnetic induction.",
        marks: 1,
        markScheme:
          'Induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage [B1].',
        modelAnswer: 'The magnitude of induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage.',
        keyPoints: ['rate of change of magnetic flux linkage'],
        examinerNotes: "Must state 'rate of change of magnetic flux linkage'.",
      },
      {
        partId: '(b)',
        questionText:
          'The peak induced e.m.f. is E₀ = 8.50 V. Calculate the frequency of rotation f.',
        marks: 3,
        markScheme:
          'E₀ = BANω = BAN(2πf) [C1]\n8.50 = 0.160 × (4.20 × 10⁻³) × 250 × (2πf) = 1.0556 f [C1]\nf = 8.50 / 1.0556 = 8.05 Hz [A1].',
        modelAnswer:
          'E₀ = B A N (2πf)  =>  8.50 = 0.160 × 0.00420 × 250 × 2π × f  =>  f = 8.05 Hz.',
        keyPoints: ['E₀ = BAN(2πf)', '8.05 Hz'],
        examinerNotes: '8.05 Hz.',
        calculatedAnswer: {
          value: '8.05',
          unit: 'Hz',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Explain why the induced e.m.f. is alternating and state the orientation of the coil when the induced e.m.f. is zero.',
        marks: 3,
        markScheme:
          'Flux linkage varies sinusoidally with time: Φ = BAN cos(ωt) [B1]\nRate of change of flux reverses direction every half rotation [B1]\ne.m.f. is zero when plane of coil is perpendicular / normal to magnetic field (flux linkage is maximum) [B1].',
        modelAnswer:
          'As the coil turns, magnetic flux varies sinusoidally with time. The rate of cutting flux reverses sign every half turn, making the induced e.m.f. alternating. The e.m.f. is zero when the plane of the coil is perpendicular to the magnetic field, because the rate of change of flux is zero at maximum flux.',
        keyPoints: ['sinusoidal variation', 'reverses sign every half turn', 'plane perpendicular to B field'],
        examinerNotes: 'Very common 3-mark conceptual question.',
      },
      {
        partId: '(d)',
        questionText:
          'Describe how eddy currents are induced in a solid core and how they are reduced in practical transformers.',
        marks: 2,
        markScheme:
          'Changing magnetic flux induces circulating currents (eddy currents) in the conducting metal core [B1]\nReduced by laminating the core with thin insulated sheets [B1].',
        modelAnswer:
          'Changing magnetic flux through the iron core induces circulating currents known as eddy currents. They are minimized by using a laminated core composed of thin iron sheets insulated from one another.',
        keyPoints: ['eddy currents induced by changing flux', 'laminated core'],
        examinerNotes: 'Mention laminated iron sheets.',
      },
    ],
  },

  // --- Q5: Nuclear Decay ---
  {
    id: 'p4_q5_nuclear',
    topic: 'Nuclear Physics',
    title: 'Q5. Radioactive Decay of Actinium-225',
    totalMarks: 8,
    context:
      'Actinium-225 (²²⁵₈₉Ac) has half-life t_1/2 = 9.92 days. A sample initially contains N₀ = 1.80 × 10¹⁴ nuclei.',
    parts: [
      {
        partId: '(a)',
        questionText: 'Define radioactive decay constant λ.',
        marks: 1,
        markScheme: 'Probability per unit time of decay of a nucleus [B1].',
        modelAnswer: 'The probability per unit time of the decay of a given nucleus.',
        keyPoints: ['probability per unit time', 'decay of a nucleus'],
        examinerNotes: "Do not write 'rate of decay'. Rate of decay is Activity.",
      },
      {
        partId: '(b)',
        questionText: 'Calculate the initial activity A₀ in Becquerels (Bq).',
        marks: 3,
        markScheme:
          't_1/2 in seconds = 9.92 × 24 × 3600 = 8.571 × 10⁵ s [C1]\nλ = ln(2) / t_1/2 = 8.087 × 10⁻⁷ s⁻¹ [C1]\nA₀ = λN₀ = (8.087 × 10⁻⁷) × (1.80 × 10¹⁴) = 1.46 × 10⁸ Bq [A1].',
        modelAnswer:
          't_1/2 = 9.92 × 86400 = 8.571 × 10⁵ s\nλ = 0.69315 / (8.571 × 10⁵) = 8.087 × 10⁻⁷ s⁻¹\nA₀ = λN₀ = 1.46 × 10⁸ Bq.',
        keyPoints: ['convert days to seconds', 'λ = ln(2)/t_1/2', 'A = λN', '1.46 × 10⁸ Bq'],
        examinerNotes: 'Must convert days to seconds to obtain Activity in Bq.',
        calculatedAnswer: {
          value: '1.46e8',
          unit: 'Bq',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the time t in days required for the number of nuclei to decrease to 2.50 × 10¹³.',
        marks: 2,
        markScheme:
          'N = N₀ e^(-λt)  =>  2.50 × 10¹³ = 1.80 × 10¹⁴ e^(-λt) [C1]\nt = 28.3 days [A1].',
        modelAnswer:
          'N/N₀ = 2.50/18.0 = 0.13889\nln(0.13889) = -1.9741\nt = 1.9741 × (9.92 / 0.69315) = 28.3 days.',
        keyPoints: ['N = N₀ e^(-λt)', '28.3 days'],
        examinerNotes: '28.3 days.',
        calculatedAnswer: {
          value: '28.3',
          unit: 'days',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'Explain why the actual count rate measured by a detector placed near the sample after 28 days is higher than that predicted by the decay of Actinium-225 alone.',
        marks: 2,
        markScheme:
          'The daughter nucleus (Francium-221) is also radioactive [B1]\nDecay of daughter nuclei in the decay chain emits additional radiation [B1].',
        modelAnswer:
          'The decay product, Francium-221, is also unstable and radioactive. As it decays through subsequent daughter nuclides in the decay chain, additional alpha, beta, and gamma emissions are recorded by the detector.',
        keyPoints: ['daughter nucleus is radioactive', 'decay chain emits additional radiation'],
        examinerNotes: 'Full marks for citing radioactive daughter products.',
      },
    ],
  },

  // --- Q6: Circular Motion Banked Track ---
  {
    id: 'p4_q6_banked_curve',
    topic: 'Circular Motion',
    title: 'Q6. Car Rounding a Banked Curved Track',
    totalMarks: 8,
    context:
      'A race car of mass m = 1200 kg travels around a circular track of radius r = 80.0 m banked at an angle θ = 28.0° to the horizontal. Assume there is zero sideways friction between tyres and track.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Draw or state the two forces acting on the car and show how the centripetal force is provided.',
        marks: 2,
        markScheme:
          'Forces: Weight mg vertically downwards and Normal reaction N perpendicular to track [B1]\nCentripetal force is provided by the horizontal component of the normal reaction force: N sin(θ) [B1].',
        modelAnswer:
          'The only two forces acting are weight W = mg acting vertically downward, and normal contact force N acting perpendicular to the banked surface. The horizontal component N sin(θ) acts towards the center of curvature to provide the required centripetal force.',
        keyPoints: ['weight mg and normal force N', 'N sin(θ) provides centripetal force'],
        examinerNotes: "Specify that N sin(θ) provides the centripetal force.",
      },
      {
        partId: '(b)',
        questionText:
          'Show that the design speed v without friction is given by v = √(rg tan θ).',
        marks: 2,
        markScheme:
          'Vertical equilibrium: N cos(θ) = mg [C1]\nHorizontal circular motion: N sin(θ) = mv² / r [C1]\nDividing equations: tan(θ) = v² / (rg), hence v = √(rg tan θ) [A1].',
        modelAnswer:
          'Vertically: N cos(θ) = mg  =>  N = mg / cos(θ)\nHorizontally: N sin(θ) = m v² / r\nSubstituting: (mg / cos(θ)) sin(θ) = m v² / r  =>  g tan(θ) = v² / r  =>  v = √(rg tan θ)',
        keyPoints: ['N cosθ = mg', 'N sinθ = mv²/r', 'tanθ = v²/rg'],
        examinerNotes: 'Standard A2 circular motion derivation.',
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the design speed v and the magnitude of the normal force N. (g = 9.81 m s⁻²)',
        marks: 4,
        markScheme:
          'v = √(80.0 × 9.81 × tan(28.0°)) = √(80.0 × 9.81 × 0.5317) = 20.4 m s⁻¹ [A1]\nN = mg / cos(28.0°) = (1200 × 9.81) / 0.88295 = 1.33 × 10⁴ N [A1].',
        modelAnswer:
          'v = √(80.0 × 9.81 × tan(28.0°)) = 20.4 m s⁻¹ (or 73.5 km/h)\nN = (1200 × 9.81) / cos(28.0°) = 1.33 × 10⁴ N.',
        keyPoints: ['20.4 m s⁻¹', '1.33 × 10⁴ N'],
        examinerNotes: 'Ensure 3 significant figures.',
        calculatedAnswer: {
          value: '20.4',
          unit: 'm s⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q7: Gravitational Potential & Field Strength ---
  {
    id: 'p4_q7_grav_field_strength',
    topic: 'Gravitational Fields',
    title: 'Q7. Gravitational Field Strength and Kepler Orbit',
    totalMarks: 8,
    context:
      'The Moon has mass M = 7.35 × 10²² kg and radius R = 1.74 × 10⁶ m. A spacecraft orbits in a circular orbit at an altitude of 120 km above the lunar surface.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Define gravitational field strength at a point in space.',
        marks: 1,
        markScheme:
          'Gravitational force per unit mass on a small test mass [B1].',
        modelAnswer: 'The gravitational force per unit mass acting on a small test mass placed at that point.',
        keyPoints: ['force per unit mass'],
        examinerNotes: "Must state 'force per unit mass'.",
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the gravitational field strength g at the surface of the Moon.',
        marks: 2,
        markScheme:
          'g = GM / R² = (6.67 × 10⁻¹¹ × 7.35 × 10²²) / (1.74 × 10⁶)² = 1.62 N kg⁻¹ (or m s⁻²) [A1].',
        modelAnswer:
          'g = (6.67 × 10⁻¹¹ × 7.35 × 10²²) / (1.74 × 10⁶)² = 1.62 N kg⁻¹.',
        keyPoints: ['g = GM/R²', '1.62 N kg⁻¹'],
        examinerNotes: '1.62 N kg⁻¹ or m s⁻².',
        calculatedAnswer: {
          value: '1.62',
          unit: 'N kg⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the orbital period T of the spacecraft orbiting at altitude 120 km.',
        marks: 3,
        markScheme:
          'Orbital radius r = R + h = 1.74 × 10⁶ + 0.12 × 10⁶ = 1.86 × 10⁶ m [C1]\nT² = (4π² / GM) r³ [C1]\nT = √[(4π² / (6.67 × 10⁻¹¹ × 7.35 × 10²²)) × (1.86 × 10⁶)³] = 7.19 × 10³ s (approx 120 min) [A1].',
        modelAnswer:
          'Orbital radius r = 1.74 × 10⁶ + 120 × 10³ = 1.86 × 10⁶ m\nT = √[(4π² r³) / (GM)] = 7.19 × 10³ s (or 1.998 hours).',
        keyPoints: ['r = R + h', 'T² = 4π²r³ / GM', '7.19 × 10³ s'],
        examinerNotes: 'Do not forget to add altitude to radius!',
        calculatedAnswer: {
          value: '7.19e3',
          unit: 's',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'Explain why an astronaut inside the orbiting spacecraft feels weightless even though gravitational field strength at the orbit is ~1.4 N kg⁻¹.',
        marks: 2,
        markScheme:
          'Both the astronaut and the spacecraft have the same acceleration towards the Moon [B1]\nThere is no normal contact force / reaction force between astronaut and the spacecraft floor [B1].',
        modelAnswer:
          'Both the spacecraft and the astronaut are in free fall with the exact same gravitational acceleration towards the Moon. Because both accelerate at the same rate, there is no normal reaction force exerted by the floor on the astronaut.',
        keyPoints: ['same acceleration towards Moon / free fall', 'no normal reaction force'],
        examinerNotes: 'Weightlessness is due to absence of reaction force, NOT absence of gravity.',
      },
    ],
  },

  // --- Q8: Geostationary Satellites ---
  {
    id: 'p4_q8_geostationary',
    topic: 'Gravitational Fields',
    title: 'Q8. Geostationary Communication Satellites',
    totalMarks: 8,
    context:
      'Geostationary satellites remain above the same point on Earth. Earth has mass M = 5.97 × 10²⁴ kg and radius R = 6.37 × 10⁶ m.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State three conditions required for an orbit to be geostationary.',
        marks: 3,
        markScheme:
          '1. Period of orbit is 24 hours (equal to period of Earth rotation) [B1]\n2. Orbit lies in the plane of the equator [B1]\n3. Orbit moves from west to east (same direction as Earth rotation) [B1].',
        modelAnswer:
          '1. Orbital period must be exactly 24 hours (one day).\n2. Must orbit in the equatorial plane.\n3. Must rotate from West to East in the same direction as Earth rotation.',
        keyPoints: ['period 24 hours', 'equatorial orbit', 'west to east'],
        examinerNotes: '3 standard B1 marks.',
      },
      {
        partId: '(b)',
        questionText:
          'Show that the radius r of a geostationary orbit is approximately 4.2 × 10⁷ m.',
        marks: 3,
        markScheme:
          'T = 24 × 3600 = 8.64 × 10⁴ s [C1]\nr³ = (GM T²) / (4π²) [C1]\n= (6.67 × 10⁻¹¹ × 5.97 × 10²⁴ × (8.64 × 10⁴)²) / (4π²) = 7.537 × 10²² m³\nr = 4.22 × 10⁷ m ≈ 4.2 × 10⁷ m [A1].',
        modelAnswer:
          'T = 86400 s\nr³ = (GM T²) / (4π²) = (6.67 × 10⁻¹¹ × 5.97 × 10²⁴ × 86400²) / 4π² = 7.537 × 10²²\nr = 4.22 × 10⁷ m (42,200 km).',
        keyPoints: ['T = 86400 s', 'r³ = GMT²/4π²', '4.22 × 10⁷ m'],
        examinerNotes: 'Show explicit substitution of T = 86400 s.',
        calculatedAnswer: {
          value: '4.22e7',
          unit: 'm',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'State one advantage and one disadvantage of geostationary satellites compared to low Earth orbit (LEO) satellites for communication.',
        marks: 2,
        markScheme:
          'Advantage: Satellite remains in fixed position relative to Earth so ground tracking dishes do not need to steer / track [B1]\nDisadvantage: Greater distance results in significant signal time delay / weaker signal / cannot cover polar regions [B1].',
        modelAnswer:
          'Advantage: Dishes on Earth do not need to move or track the satellite because it remains stationary in the sky.\nDisadvantage: Significant communication latency (approx 0.25 s delay) due to the large altitude, and poor coverage of polar latitudes.',
        keyPoints: ['stationary dish tracking', 'latency / signal delay / polar blindspot'],
        examinerNotes: 'Clear contrast required.',
      },
    ],
  },

  // --- Q9: Thermal Physics Specific Heat Capacity ---
  {
    id: 'p4_q9_thermal_shc',
    topic: 'Thermal Physics',
    title: 'Q9. Specific Heat Capacity of Metal Block with Heat Losses',
    totalMarks: 8,
    context:
      'An electric immersion heater of rating P = 45.0 W heats a copper block of mass m = 0.850 kg. In time t = 360 s, the temperature rises from 21.0 °C to 34.5 °C. The specific heat capacity of copper is c = 385 J kg⁻¹ K⁻¹.',
    parts: [
      {
        partId: '(a)',
        questionText: 'Define specific heat capacity.',
        marks: 2,
        markScheme:
          'Thermal energy required per unit mass [B1] per unit temperature change [B1].',
        modelAnswer: 'The thermal energy required per unit mass to raise the temperature of a substance by one unit of temperature (c = ΔQ / mΔθ).',
        keyPoints: ['thermal energy per unit mass', 'per unit temperature change'],
        examinerNotes: "Must state 'per unit mass' and 'per unit temperature change'.",
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the total thermal energy supplied by the electrical heater and the energy absorbed by the copper block.',
        marks: 3,
        markScheme:
          'Energy supplied = P × t = 45.0 × 360 = 1.62 × 10⁴ J [C1]\nTemperature rise Δθ = 34.5 - 21.0 = 13.5 K\nEnergy absorbed = mcΔθ = 0.850 × 385 × 13.5 = 4.418 × 10³ J [A1].',
        modelAnswer:
          'Supplied energy Q_sup = P × t = 45.0 W × 360 s = 1.62 × 10⁴ J (16.2 kJ)\nAbsorbed energy Q_abs = m c Δθ = 0.850 kg × 385 J kg⁻¹ K⁻¹ × 13.5 K = 4.42 × 10³ J (4.42 kJ).',
        keyPoints: ['Q_sup = 1.62 × 10⁴ J', 'Q_abs = 4.42 × 10³ J'],
        examinerNotes: 'Clear distinction between supplied electrical energy and absorbed internal energy.',
        calculatedAnswer: {
          value: '4.42e3',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Suggest two reasons why the energy absorbed by the block is less than the energy supplied by the heater.',
        marks: 2,
        markScheme:
          '1. Thermal energy is lost to the surrounding air by conduction / convection / radiation [B1]\n2. Thermal energy is absorbed by the heater itself and the thermometer [B1].',
        modelAnswer:
          '1. Heat is dissipated to the surrounding environment by convection and radiation from the uninsulated block surface.\n2. Thermal energy is absorbed by the heating element casing and the thermometer.',
        keyPoints: ['heat lost to surroundings', 'heat absorbed by heater / thermometer'],
        examinerNotes: 'Standard laboratory source of error.',
      },
      {
        partId: '(d)',
        questionText:
          'State how a continuous-flow calorimeter eliminates systematic errors due to heat losses.',
        marks: 1,
        markScheme:
          'Two trials at different electrical powers with the same temperature rise ensure identical rate of heat loss to surroundings, which cancels when subtracting equations [B1].',
        modelAnswer:
          'By performing two trials with different power inputs but keeping the temperature rise constant, the rate of heat loss to the surroundings remains identical and cancels out when subtracting the two energy equations: (P₁ - P₂) = (m₁ - m₂) c Δθ.',
        keyPoints: ['heat losses are identical and cancel out'],
        examinerNotes: 'Classic CIE mark scheme question.',
      },
    ],
  },

  // --- Q10: Latent Heat & Phase Change ---
  {
    id: 'p4_q10_latent_heat',
    topic: 'Thermal Physics',
    title: 'Q10. Specific Latent Heat of Vaporisation of Nitrogen',
    totalMarks: 7,
    context:
      'Liquid nitrogen boils at 77 K under atmospheric pressure. An electric heater immersed in liquid nitrogen operates at power P₁ = 15.0 W and evaporates mass m₁ = 28.5 g in 300 s. At power P₂ = 25.0 W, mass m₂ = 43.5 g evaporates in 300 s.',
    parts: [
      {
        partId: '(a)',
        questionText: 'Define specific latent heat of vaporisation.',
        marks: 2,
        markScheme:
          'Thermal energy required per unit mass [B1] to change liquid to gas at constant temperature [B1].',
        modelAnswer: 'The thermal energy required per unit mass to change a substance from liquid to gas without change in temperature.',
        keyPoints: ['thermal energy per unit mass', 'liquid to gas at constant temperature'],
        examinerNotes: "Omitting 'at constant temperature' loses the second mark.",
      },
      {
        partId: '(b)',
        questionText:
          'Explain why specific latent heat of vaporisation is significantly greater than specific latent heat of fusion for the same substance.',
        marks: 2,
        markScheme:
          'Vaporisation requires completely breaking intermolecular bonds and doing work against atmospheric pressure as volume increases vastly [B1]\nFusion only requires weakening intermolecular bonds with negligible volume change [B1].',
        modelAnswer:
          'During vaporisation, intermolecular bonds must be completely broken and substantial work is done against atmospheric pressure during the large increase in volume. During fusion, bonds are merely loosened or partially broken with negligible volume change.',
        keyPoints: ['completely breaking bonds + work against atmosphere', 'fusion only weakens bonds'],
        examinerNotes: 'Examiners reward stating work done against atmosphere and complete bond breakage.',
      },
      {
        partId: '(c)',
        questionText:
          'Use the data to calculate the specific latent heat of vaporisation L_v of nitrogen and the background rate of heat transfer from surroundings.',
        marks: 3,
        markScheme:
          'P₁ t + h = m₁ L_v and P₂ t + h = m₂ L_v [C1]\n(P₂ - P₁) t = (m₂ - m₁) L_v  =>  (25.0 - 15.0) × 300 = (43.5 - 28.5) × 10⁻³ × L_v [C1]\n3000 = 1.50 × 10⁻² L_v  =>  L_v = 2.00 × 10⁵ J kg⁻¹ [A1].',
        modelAnswer:
          'Let h be ambient heat absorbed in 300 s:\nP₁ t + h = m₁ L_v  and  P₂ t + h = m₂ L_v\nSubtracting: (P₂ - P₁) t = (m₂ - m₁) L_v\n(10.0 W) × 300 s = (15.0 × 10⁻³ kg) × L_v\nL_v = 3000 / 0.0150 = 2.00 × 10⁵ J kg⁻¹ (200 kJ kg⁻¹).',
        keyPoints: ['(P₂ - P₁)t = (m₂ - m₁)Lv', '2.00 × 10⁵ J kg⁻¹'],
        examinerNotes: '2.00 × 10⁵ J kg⁻¹.',
        calculatedAnswer: {
          value: '2.00e5',
          unit: 'J kg⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q11: First Law of Thermodynamics ---
  {
    id: 'p4_q11_first_law',
    topic: 'Thermal Physics',
    title: 'Q11. First Law of Thermodynamics and Gas Work',
    totalMarks: 8,
    context:
      'An ideal gas undergoes a cycle. During an isobaric expansion at constant pressure p = 2.40 × 10⁵ Pa, the volume increases from 1.50 × 10⁻³ m³ to 3.20 × 10⁻³ m³. During this process, 650 J of thermal energy is supplied to the gas.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State the first law of thermodynamics and define all symbols used.',
        marks: 2,
        markScheme:
          'ΔU = q + w [B1]\nΔU is increase in internal energy, q is thermal energy transferred TO the system, w is work done ON the system [B1].',
        modelAnswer:
          'ΔU = q + w, where ΔU is the increase in internal energy of the system, q is the thermal energy transferred TO the system, and w is the work done ON the system.',
        keyPoints: ['ΔU = q + w', 'q = heat added to system', 'w = work done on system'],
        examinerNotes: 'Must define w as work done ON the system under IUPAC convention.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the work done w ON the gas during the expansion.',
        marks: 2,
        markScheme:
          'w = -p ΔV = -(2.40 × 10⁵) × (3.20 × 10⁻³ - 1.50 × 10⁻³) = -(2.40 × 10⁵) × (1.70 × 10⁻³) = -408 J [A1].',
        modelAnswer:
          'Work done ON the gas is w = -p ΔV\nw = -(2.40 × 10⁵ Pa) × (3.20 × 10⁻³ - 1.50 × 10⁻³ m³) = -408 J (work is done by the gas as it expands).',
        keyPoints: ['w = -pΔV', '-408 J'],
        examinerNotes: "Negative sign is critical because gas expands (work done ON the gas is negative).",
        calculatedAnswer: {
          value: '-408',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the change in internal energy ΔU of the gas during this expansion.',
        marks: 2,
        markScheme:
          'ΔU = q + w = +650 + (-408) = +242 J [A1].',
        modelAnswer:
          'ΔU = q + w = 650 J + (-408 J) = +242 J (internal energy increases by 242 J).',
        keyPoints: ['ΔU = q + w', '+242 J'],
        examinerNotes: '+242 J.',
        calculatedAnswer: {
          value: '242',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'State and explain the change in internal energy for an ideal gas undergoing an isothermal process.',
        marks: 2,
        markScheme:
          'Internal energy of an ideal gas depends solely on thermodynamic temperature (no intermolecular potential energy) [B1]\nIn an isothermal process, temperature is constant so ΔU = 0 [B1].',
        modelAnswer:
          'For an ideal gas, there are no intermolecular forces, so internal energy consists solely of molecular kinetic energy which depends exclusively on thermodynamic temperature. Because temperature is constant in an isothermal process, the change in internal energy is zero (ΔU = 0).',
        keyPoints: ['internal energy depends only on temperature', 'ΔU = 0'],
        examinerNotes: 'Must mention that ideal gas has no potential energy.',
      },
    ],
  },

  // --- Q12: Ideal Gases & Molecular Kinetic Energy ---
  {
    id: 'p4_q12_ideal_gas_kinetic',
    topic: 'Ideal Gases',
    title: 'Q12. Kinetic Theory and Root-Mean-Square Speed of Helium',
    totalMarks: 8,
    context:
      'Helium-4 gas has molar mass M_mol = 4.00 × 10⁻³ kg mol⁻¹. A sample of helium gas is at temperature T = 300 K. (Boltzmann constant k = 1.38 × 10⁻²³ J K⁻¹, Avogadro constant N_A = 6.02 × 10²³ mol⁻¹).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State what is represented by the root-mean-square (r.m.s.) speed of gas molecules.',
        marks: 1,
        markScheme:
          'The square root of the mean value of the squares of the speeds of the molecules [B1] (c_rms = √<c²>).',
        modelAnswer: 'The square root of the mean of the squares of the speeds of the molecules in the gas.',
        keyPoints: ['square root of the mean of squares of speeds'],
        examinerNotes: "Not 'average speed'! Must be square root of mean square speed.",
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the mean translational kinetic energy <E_k> of a helium atom at 300 K.',
        marks: 2,
        markScheme:
          '<E_k> = 3/2 k T = 1.5 × (1.38 × 10⁻²³) × 300 = 6.21 × 10⁻²¹ J [A1].',
        modelAnswer:
          '<E_k> = 3/2 k T = 1.5 × (1.38 × 10⁻²³ J K⁻¹) × 300 K = 6.21 × 10⁻²¹ J.',
        keyPoints: ['<Ek> = 3/2 kT', '6.21 × 10⁻²¹ J'],
        examinerNotes: '6.21 × 10⁻²¹ J.',
        calculatedAnswer: {
          value: '6.21e-21',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the r.m.s. speed c_rms of helium atoms at 300 K.',
        marks: 3,
        markScheme:
          'Mass of one atom m = M_mol / N_A = 4.00 × 10⁻³ / 6.02 × 10²³ = 6.645 × 10⁻²⁷ kg [C1]\n1/2 m c_rms² = 6.21 × 10⁻²¹  =>  c_rms = √[(2 × 6.21 × 10⁻²¹) / (6.645 × 10⁻²⁷)] [C1]\nc_rms = 1.37 × 10³ m s⁻¹ [A1].',
        modelAnswer:
          'Mass of single atom m = 4.00 × 10⁻³ / 6.02 × 10²³ = 6.645 × 10⁻²⁷ kg\nc_rms = √(3kT / m) = √[(3 × 1.38 × 10⁻²³ × 300) / 6.645 × 10⁻²⁷] = 1.37 × 10³ m s⁻¹ (1370 m/s).',
        keyPoints: ['m = M/NA', 'c_rms = √(3kT/m)', '1.37 × 10³ m s⁻¹'],
        examinerNotes: '1.37 × 10³ m s⁻¹.',
        calculatedAnswer: {
          value: '1.37e3',
          unit: 'm s⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'Explain why hydrogen and helium escape from Earth’s atmosphere while nitrogen and oxygen are retained.',
        marks: 2,
        markScheme:
          'Lighter molecules (smaller mass m) have much higher r.m.s. speeds at the same temperature [B1]\nA significant fraction of hydrogen/helium molecules have speeds exceeding Earth escape velocity (11.2 km/s) [B1].',
        modelAnswer:
          'Because mean kinetic energy depends only on temperature, lighter molecules like helium and hydrogen have much higher r.m.s. speeds than heavier nitrogen and oxygen. In the Maxwell-Boltzmann distribution, a significant fraction of light molecules exceed Earth’s escape velocity and leak into space over astronomical timescales.',
        keyPoints: ['smaller mass gives higher rms speed', 'exceeds Earth escape velocity'],
        examinerNotes: 'Reference the high-speed tail of the distribution exceeding escape speed.',
      },
    ],
  },

  // --- Q13: Ideal Gas Law Cylinder ---
  {
    id: 'p4_q13_gas_cylinder',
    topic: 'Ideal Gases',
    title: 'Q13. Gas Cylinder at Variable Temperature and Pressure',
    totalMarks: 7,
    context:
      'A rigid steel cylinder of fixed volume V = 0.0450 m³ contains oxygen gas at pressure p₁ = 3.50 × 10⁶ Pa and temperature T₁ = 290 K. (Molar gas constant R = 8.31 J K⁻¹ mol⁻¹).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Calculate the number of moles n of oxygen gas in the cylinder.',
        marks: 2,
        markScheme:
          'n = p₁ V / (R T₁) = (3.50 × 10⁶ × 0.0450) / (8.31 × 290) = 157.5 / 2.4099 = 65.4 mol [A1].',
        modelAnswer:
          'pV = nRT  =>  n = (3.50 × 10⁶ Pa × 0.0450 m³) / (8.31 J K⁻¹ mol⁻¹ × 290 K) = 65.4 mol.',
        keyPoints: ['n = pV/RT', '65.4 mol'],
        examinerNotes: '65.4 mol (to 3 s.f.).',
        calculatedAnswer: {
          value: '65.4',
          unit: 'mol',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)',
        questionText:
          'The cylinder is heated to T₂ = 350 K. Calculate the new pressure p₂ inside the cylinder.',
        marks: 2,
        markScheme:
          'p₁ / T₁ = p₂ / T₂  =>  p₂ = p₁ (T₂ / T₁) = (3.50 × 10⁶) × (350 / 290) = 4.22 × 10⁶ Pa [A1].',
        modelAnswer:
          'Volume is fixed, so p / T is constant:\np₂ = p₁ × (T₂ / T₁) = 3.50 × 10⁶ × (350 / 290) = 4.22 × 10⁶ Pa.',
        keyPoints: ['p₂ = p₁(T₂/T₁)', '4.22 × 10⁶ Pa'],
        examinerNotes: '4.22 × 10⁶ Pa.',
        calculatedAnswer: {
          value: '4.22e6',
          unit: 'Pa',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'A valve is opened and gas escapes until the pressure falls back to 3.50 × 10⁶ Pa at 350 K. Calculate the mass of oxygen that escaped. (Molar mass of O₂ = 32.0 g mol⁻¹).',
        marks: 3,
        markScheme:
          'Remaining moles n₂ = p V / (R T₂) = (3.50 × 10⁶ × 0.0450) / (8.31 × 350) = 54.15 mol [C1]\nMoles escaped Δn = 65.35 - 54.15 = 11.20 mol [C1]\nMass escaped = Δn × M_mol = 11.20 × 0.0320 = 0.358 kg (358 g) [A1].',
        modelAnswer:
          'n_remaining = (3.50 × 10⁶ × 0.0450) / (8.31 × 350) = 54.15 mol\nMoles escaped = 65.35 - 54.15 = 11.20 mol\nMass escaped = 11.20 mol × 0.0320 kg/mol = 0.358 kg (358 g).',
        keyPoints: ['Δn = 11.2 mol', '0.358 kg'],
        examinerNotes: '0.358 kg (358 g).',
        calculatedAnswer: {
          value: '0.358',
          unit: 'kg',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q14: Damped Oscillations & Resonance ---
  {
    id: 'p4_q14_damping_resonance',
    topic: 'Oscillations',
    title: 'Q14. Forced Oscillations, Damping Types, and Quality Factor',
    totalMarks: 7,
    context:
      'A mechanical oscillator is driven by a periodic external force of variable frequency f. The system undergoes different types of damping depending on fluid viscosity.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Distinguish between free oscillations and forced oscillations.',
        marks: 2,
        markScheme:
          'Free oscillations: System oscillates at its natural frequency with no external driving force [B1]\nForced oscillations: System is driven by a continuous periodic external force and oscillates at the driving frequency [B1].',
        modelAnswer:
          'Free oscillations occur when a displaced system oscillates at its own natural frequency without any external periodic driving force. Forced oscillations occur when an external periodic driver continuously forces the system to vibrate at the driving frequency.',
        keyPoints: ['free = natural frequency, no driver', 'forced = oscillates at driving frequency'],
        examinerNotes: 'Must specify the frequency each oscillates at.',
      },
      {
        partId: '(b)',
        questionText:
          'Define critical damping and give one practical engineering application.',
        marks: 2,
        markScheme:
          'Critical damping: System returns to equilibrium position in the minimum possible time without oscillating [B1]\nApplication: Car suspension dampers (shock absorbers) / galvanometer needles [B1].',
        modelAnswer:
          'Critical damping is the degree of damping that returns an oscillator to its equilibrium position in the minimum possible time without overshooting or oscillating. Examples include vehicle shock absorbers and analog galvanometer meters.',
        keyPoints: ['minimum time without oscillating', 'car suspension / galvanometer'],
        examinerNotes: 'Application + exact definition required.',
      },
      {
        partId: '(c)',
        questionText:
          'Sketch or describe how the amplitude vs driving frequency resonance curve changes as damping is progressively increased.',
        marks: 3,
        markScheme:
          '1. Peak amplitude decreases [B1]\n2. Peak shifts slightly to a lower frequency [B1]\n3. Resonance curve becomes flatter / broader [B1].',
        modelAnswer:
          'As damping increases: 1. The maximum resonant amplitude decreases significantly. 2. The peak frequency shifts slightly to a lower value than the undamped natural frequency. 3. The curve becomes broader and flatter.',
        keyPoints: ['peak amplitude decreases', 'peak shifts to lower frequency', 'curve becomes broader'],
        examinerNotes: 'Must state all 3 features for full 3 marks.',
      },
    ],
  },

  // --- Q15: SHM U-Tube Liquid Column ---
  {
    id: 'p4_q15_utube_shm',
    topic: 'Oscillations',
    title: 'Q15. Liquid Column Oscillating in a U-Tube',
    totalMarks: 8,
    context:
      'A U-tube of uniform cross-sectional area A contains a liquid of total column length L = 0.650 m and density ρ. The liquid is displaced by distance x in one arm and released, undergoing SHM with restoring force F = -2ρAgx.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Show that the acceleration a of the liquid column is given by a = -(2g / L) x and verify that this represents SHM.',
        marks: 3,
        markScheme:
          'Total mass of liquid m = ρ A L [C1]\nNewton’s second law: F = m a  =>  -2 ρ A g x = (ρ A L) a [C1]\na = -(2g / L) x. Since a ∝ -x, this represents simple harmonic motion with ω² = 2g / L [A1].',
        modelAnswer:
          'Total mass of liquid column is m = ρ A L.\nRestoring force from unbalanced liquid head of 2x is F = -2 A x ρ g.\nApplying F = m a:\n-2 ρ A g x = (ρ A L) a  =>  a = -(2g / L) x.\nBecause acceleration is directly proportional to displacement and directed towards equilibrium, this satisfies the defining condition of SHM with angular frequency ω = √(2g / L).',
        keyPoints: ['m = ρAL', 'a = -(2g/L)x', 'a ∝ -x proves SHM'],
        examinerNotes: 'Show explicit cancellation of ρ and A.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the period of oscillation T of the liquid column. (g = 9.81 m s⁻²)',
        marks: 3,
        markScheme:
          'ω = √(2g / L) = √[(2 × 9.81) / 0.650] = √(30.18) = 5.494 rad s⁻¹ [C1]\nT = 2π / ω = 2π / 5.494 = 1.14 s [A1].',
        modelAnswer:
          'ω = √(2g / L) = √(19.62 / 0.650) = 5.494 rad s⁻¹\nT = 2π / ω = 2π / 5.494 = 1.14 s.',
        keyPoints: ['ω = √(2g/L)', 'T = 1.14 s'],
        examinerNotes: '1.14 s (to 3 s.f.).',
        calculatedAnswer: {
          value: '1.14',
          unit: 's',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'State the effect on the period of oscillation if a denser liquid of the same total length L were used.',
        marks: 2,
        markScheme:
          'Period T is independent of liquid density ρ and cross-sectional area A [B1]\nTherefore, the period remains unchanged at 1.14 s [B1].',
        modelAnswer:
          'The equation for angular frequency ω = √(2g / L) does not contain density ρ or area A. Therefore, using a denser liquid of the same length L has no effect on the period of oscillation.',
        keyPoints: ['T is independent of density', 'period unchanged'],
        examinerNotes: 'Density cancels out of the acceleration equation.',
      },
    ],
  },

  // --- Q16: Millikan Oil Drop ---
  {
    id: 'p4_q16_millikan',
    topic: 'Electric Fields',
    title: 'Q16. Millikan’s Experiment and Quantisation of Charge',
    totalMarks: 8,
    context:
      'In Millikan’s experiment, a charged oil drop of mass m = 3.20 × 10⁻¹⁵ kg is held stationary between two horizontal parallel plates separated by d = 1.50 cm when potential difference V = 980 V is applied.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State the polarity of the top plate if the oil drop carries a negative charge.',
        marks: 1,
        markScheme: 'Top plate must be positive [B1].',
        modelAnswer: 'The top plate must be positive so the upward electrostatic force on the negative drop balances weight.',
        keyPoints: ['positive top plate'],
        examinerNotes: 'Positive.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the electric field strength E between the plates.',
        marks: 2,
        markScheme:
          'E = V / d = 980 / (1.50 × 10⁻²) = 6.53 × 10⁴ V m⁻¹ (or N C⁻¹) [A1].',
        modelAnswer:
          'E = V / d = 980 V / 0.0150 m = 6.53 × 10⁴ V m⁻¹.',
        keyPoints: ['E = V/d', '6.53 × 10⁴ V m⁻¹'],
        examinerNotes: 'Convert cm to m.',
        calculatedAnswer: {
          value: '6.53e4',
          unit: 'V m⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the charge q on the oil drop and express it in terms of the elementary charge e = 1.60 × 10⁻¹⁹ C.',
        marks: 3,
        markScheme:
          'q E = m g  =>  q = m g / E = (3.20 × 10⁻¹⁵ × 9.81) / (6.533 × 10⁴) [C1]\nq = 4.80 × 10⁻¹⁹ C [A1]\nNumber of elementary charges n = q / e = (4.80 × 10⁻¹⁹) / (1.60 × 10⁻¹⁹) = 3 [A1].',
        modelAnswer:
          'q = mg / E = (3.20 × 10⁻¹⁵ × 9.81) / (6.533 × 10⁴) = 4.80 × 10⁻¹⁹ C\nIn elementary units: n = 4.80 × 10⁻¹⁹ / 1.60 × 10⁻¹⁹ = 3e (drop has 3 excess electrons).',
        keyPoints: ['q = mg/E', '4.80 × 10⁻¹⁹ C', 'q = 3e'],
        examinerNotes: 'q = 3e.',
        calculatedAnswer: {
          value: '4.80e-19',
          unit: 'C',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText: 'Explain what is meant by quantisation of electric charge.',
        marks: 2,
        markScheme:
          'Electric charge only exists in discrete packets / integer multiples of the elementary charge e [B1] (q = ne where n is an integer) [B1].',
        modelAnswer:
          'Electric charge is quantised, meaning it only exists as discrete packets that are integer multiples of the fundamental elementary charge e (q = ±n·e, where n = 1, 2, 3...).',
        keyPoints: ['integer multiples of elementary charge e'],
        examinerNotes: 'Must mention integer multiples of e.',
      },
    ],
  },

  // --- Q17: Deflection of Electron Beam ---
  {
    id: 'p4_q17_electron_deflection',
    topic: 'Electric Fields',
    title: 'Q17. Deflection of Electrons in Uniform Electric Field',
    totalMarks: 8,
    context:
      'Electrons of mass m_e = 9.11 × 10⁻³¹ kg and charge e = 1.60 × 10⁻¹⁹ C enter horizontally with speed v_x = 2.40 × 10⁷ m s⁻¹ into the space between two parallel plates of length L = 6.00 cm with electric field E = 4.50 × 10³ V m⁻¹ directed vertically downward.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State the direction of the electric force on the electrons and describe their trajectory.',
        marks: 2,
        markScheme:
          'Electric force is vertically upward [B1]\nTrajectory is parabolic [B1].',
        modelAnswer:
          'Because electrons have negative charge, the force is directed vertically upward (opposite to field). The trajectory is a parabola.',
        keyPoints: ['vertically upward force', 'parabolic trajectory'],
        examinerNotes: 'Upward force + parabolic path.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the time t spent by an electron between the plates.',
        marks: 2,
        markScheme:
          't = L / v_x = (6.00 × 10⁻²) / (2.40 × 10⁷) = 2.50 × 10⁻⁹ s (2.50 ns) [A1].',
        modelAnswer:
          'Horizontal speed is constant: t = L / v_x = 0.0600 / (2.40 × 10⁷) = 2.50 × 10⁻⁹ s.',
        keyPoints: ['t = L/vx', '2.50 × 10⁻⁹ s'],
        examinerNotes: '2.50 × 10⁻⁹ s.',
        calculatedAnswer: {
          value: '2.50e-9',
          unit: 's',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the vertical deflection y of an electron as it emerges from the plates.',
        marks: 4,
        markScheme:
          'Vertical acceleration a_y = e E / m_e = (1.60 × 10⁻¹⁹ × 4.50 × 10³) / (9.11 × 10⁻³¹) = 7.903 × 10¹⁴ m s⁻² [C1]\ny = 1/2 a_y t² = 1/2 × (7.903 × 10¹⁴) × (2.50 × 10⁻⁹)² [C1]\ny = 2.47 × 10⁻³ m (2.47 mm) [A1].',
        modelAnswer:
          'a_y = eE / m_e = (1.60 × 10⁻¹⁹ × 4500) / (9.11 × 10⁻³¹) = 7.903 × 10¹⁴ m s⁻²\ny = 1/2 a_y t² = 0.5 × (7.903 × 10¹⁴) × (2.50 × 10⁻⁹)² = 2.47 × 10⁻³ m (2.47 mm).',
        keyPoints: ['ay = eE/m', 'y = 1/2 ay t²', '2.47 × 10⁻³ m'],
        examinerNotes: '2.47 mm.',
        calculatedAnswer: {
          value: '2.47e-3',
          unit: 'm',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q18: Capacitors Combination ---
  {
    id: 'p4_q18_cap_combo',
    topic: 'Capacitance',
    title: 'Q18. Series and Parallel Capacitor Networks',
    totalMarks: 8,
    context:
      'Three capacitors C₁ = 20.0 μF, C₂ = 30.0 μF, and C₃ = 60.0 μF are connected to a 12.0 V battery. C₁ and C₂ are connected in parallel, and this combination is in series with C₃.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Derive the formula for total capacitance of two capacitors in parallel: C_total = C₁ + C₂.',
        marks: 2,
        markScheme:
          'Total charge Q = Q₁ + Q₂ with common potential difference V [C1]\nQ = C₁V + C₂V = (C₁ + C₂)V, hence C_total = C₁ + C₂ [A1].',
        modelAnswer:
          'For capacitors in parallel, potential difference V is identical across each. Total charge stored is Q = Q₁ + Q₂. Since Q = CV, Q = C₁V + C₂V = (C₁ + C₂)V. Therefore, C_total = C₁ + C₂.',
        keyPoints: ['Q = Q₁ + Q₂', 'common V', 'C_total = C₁ + C₂'],
        examinerNotes: 'Standard 2-mark derivation.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the total equivalent capacitance C_eq of the network.',
        marks: 3,
        markScheme:
          'Parallel combination C_p = C₁ + C₂ = 20.0 + 30.0 = 50.0 μF [C1]\nSeries with C₃: 1/C_eq = 1/50.0 + 1/60.0 = 11 / 300 [C1]\nC_eq = 300 / 11 = 27.3 μF [A1].',
        modelAnswer:
          'C_parallel = 20.0 + 30.0 = 50.0 μF\n1 / C_eq = 1 / 50.0 + 1 / 60.0 = (6 + 5) / 300 = 11 / 300\nC_eq = 300 / 11 = 27.3 μF.',
        keyPoints: ['Cp = 50 μF', '1/Ceq = 1/Cp + 1/C₃', '27.3 μF'],
        examinerNotes: '27.3 μF.',
        calculatedAnswer: {
          value: '27.3',
          unit: 'μF',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the total energy stored in the network and the potential difference across C₃.',
        marks: 3,
        markScheme:
          'Total energy E = 1/2 C_eq V² = 1/2 × (27.27 × 10⁻⁶) × 144 = 1.96 × 10⁻³ J [A1]\nTotal charge Q = C_eq V = (27.27 × 10⁻⁶) × 12.0 = 3.27 × 10⁻⁴ C [C1]\nV₃ = Q / C₃ = (3.27 × 10⁻⁴) / (60.0 × 10⁻⁶) = 5.45 V [A1].',
        modelAnswer:
          'E_total = 1/2 C_eq V² = 0.5 × (27.27 × 10⁻⁶ F) × (12.0 V)² = 1.96 × 10⁻³ J (1.96 mJ)\nTotal charge Q = 27.27 μF × 12.0 V = 327 μC\nP.d. across C₃: V₃ = Q / C₃ = 327 μC / 60.0 μF = 5.45 V.',
        keyPoints: ['E = 1.96 × 10⁻³ J', 'V₃ = 5.45 V'],
        examinerNotes: '1.96 mJ and 5.45 V.',
        calculatedAnswer: {
          value: '5.45',
          unit: 'V',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q19: Magnetic Force on Wire ---
  {
    id: 'p4_q19_current_balance',
    topic: 'Magnetic Fields',
    title: 'Q19. Force on Current-Carrying Wire and Current Balance',
    totalMarks: 7,
    context:
      'A horizontal wire of length L = 5.00 cm carrying current I = 4.20 A passes perpendicularly through a horizontal magnetic field between poles of a magnet resting on a top-pan balance. When current is switched on, the reading on the balance changes by Δm = +2.45 g.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State Fleming’s left-hand rule and identify the direction of the magnetic force on the magnet.',
        marks: 2,
        markScheme:
          'Thumb = Force/Motion, First finger = Magnetic field, Second finger = Current (mutually perpendicular) [B1]\nBecause reading increases, force on magnet is downward; by Newton’s 3rd law, force on wire is upward [B1].',
        modelAnswer:
          'Fleming’s Left-Hand Rule: Thumb represents force, first finger represents magnetic field, second finger represents current, held mutually perpendicular. An increased balance reading indicates a downward force on the magnet, so by Newton’s third law the wire experiences an equal upward magnetic force.',
        keyPoints: ['thumb/first/second finger rule', 'downward force on magnet / upward on wire'],
        examinerNotes: 'Newton third law pair must be clearly stated.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the magnetic flux density B between the pole pieces. (g = 9.81 m s⁻²)',
        marks: 3,
        markScheme:
          'F = Δm × g = (2.45 × 10⁻³ kg) × 9.81 = 2.403 × 10⁻² N [C1]\nF = B I L  =>  B = F / (I L) = (2.403 × 10⁻²) / (4.20 × 0.0500) [C1]\nB = 0.114 T [A1].',
        modelAnswer:
          'F = Δm × g = 0.00245 × 9.81 = 0.02403 N\nB = F / (I L) = 0.02403 / (4.20 × 0.0500) = 0.114 T (114 mT).',
        keyPoints: ['F = Δmg', 'B = F / IL', '0.114 T'],
        examinerNotes: '0.114 T.',
        calculatedAnswer: {
          value: '0.114',
          unit: 'T',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'State the effect on the balance reading if an alternating current of frequency 50 Hz were passed through the wire.',
        marks: 2,
        markScheme:
          'The direction of force alternates at 50 Hz [B1]\nDue to inertia of the balance, reading remains at the original resting mass (average force is zero) [B1].',
        modelAnswer:
          'The force would alternate sinusoidally at 50 Hz between upward and downward. Because the frequency is too high for the mechanical balance to respond, the reading shows the steady uncharged mass with an average force of zero.',
        keyPoints: ['force alternates at 50 Hz', 'balance cannot respond / average force zero'],
        examinerNotes: 'High-frequency inertia explanation rewarded.',
      },
    ],
  },

  // --- Q20: Particle in Magnetic Field ---
  {
    id: 'p4_q20_mass_spec',
    topic: 'Magnetic Fields',
    title: 'Q20. Mass Spectrometer and Isotope Separation',
    totalMarks: 8,
    context:
      'Singly-ionised magnesium ions (²⁴Mg⁺ and ²⁶Mg⁺) with charge q = +1.60 × 10⁻¹⁹ C enter a uniform magnetic field B = 0.450 T with velocity v = 1.80 × 10⁵ m s⁻¹ perpendicular to the field.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Show that the radius r of the circular path of an ion is given by r = mv / (Bq).',
        marks: 2,
        markScheme:
          'Magnetic force provides centripetal force: Bqv = mv² / r [M1]\nDividing by v gives Bq = mv / r, hence r = mv / (Bq) [A1].',
        modelAnswer:
          'The magnetic force acts perpendicularly to velocity, providing the required centripetal force:\nB q v = (m v²) / r  =>  B q = (m v) / r  =>  r = (m v) / (B q)',
        keyPoints: ['Bqv = mv²/r', 'r = mv/Bq'],
        examinerNotes: 'Standard derivation.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the separation between the impact points of ²⁴Mg⁺ and ²⁶Mg⁺ after completing a semicircle (180° deflection). (1 u = 1.66 × 10⁻²⁷ kg).',
        marks: 4,
        markScheme:
          'm(²⁴Mg) = 24 × 1.66 × 10⁻²⁷ = 3.984 × 10⁻²⁶ kg  =>  r₁ = 3.984 × 10⁻²⁶ × (1.80 × 10⁵) / (0.450 × 1.60 × 10⁻¹⁹) = 0.0996 m [C1]\nm(²⁶Mg) = 26 × 1.66 × 10⁻²⁷ = 4.316 × 10⁻²⁶ kg  =>  r₂ = 0.1079 m [C1]\nImpact separation = 2 r₂ - 2 r₁ = 2(0.1079 - 0.0996) = 2(0.0083) = 1.66 × 10⁻² m (1.66 cm) [A1].',
        modelAnswer:
          'r₁ = (24 × 1.66 × 10⁻²⁷ × 1.80 × 10⁵) / (0.450 × 1.60 × 10⁻¹⁹) = 0.09960 m\nr₂ = (26 / 24) × 0.09960 = 0.10790 m\nDiameter difference Δd = 2(r₂ - r₁) = 2 × 0.00830 m = 1.66 × 10⁻² m (1.66 cm).',
        keyPoints: ['r₁ = 0.0996 m', 'r₂ = 0.1079 m', 'Δd = 2(r₂ - r₁) = 1.66 cm'],
        examinerNotes: 'Must multiply radius difference by 2 because ions undergo semicircular 180° deflection.',
        calculatedAnswer: {
          value: '1.66e-2',
          unit: 'm',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Explain why the kinetic energy of an ion remains constant while traversing the magnetic field.',
        marks: 2,
        markScheme:
          'Magnetic force F = q(v × B) is always perpendicular to velocity / displacement [B1]\nWork done is W = F s cos(90°) = 0, so kinetic energy is conserved [B1].',
        modelAnswer:
          'The magnetic force is always perpendicular to the direction of motion (velocity). Because force is at 90° to instantaneous displacement, zero work is done on the ion (W = F d cos 90° = 0), so speed and kinetic energy remain constant.',
        keyPoints: ['force is perpendicular to velocity', 'work done is zero'],
        examinerNotes: 'F perpendicular to v means W = 0.',
      },
    ],
  },

  // --- Q21: Hall Probe Sensor ---
  {
    id: 'p4_q21_hall_effect',
    topic: 'Magnetic Fields',
    title: 'Q21. Hall Probe Sensor and Charge Carrier Density',
    totalMarks: 7,
    context:
      'A semiconductor slice of thickness t = 0.200 mm carries current I = 0.150 A. In uniform magnetic field B = 0.800 T, the measured Hall voltage is V_H = 4.50 mV.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Explain how the Hall voltage is established across the slice.',
        marks: 3,
        markScheme:
          'Charge carriers moving through magnetic field experience magnetic force F = Bqv [B1]\nCarriers are deflected towards one face, creating charge separation and transverse electric field E [B1]\nEquilibrium reached when electric force qE balances magnetic force Bqv [B1].',
        modelAnswer:
          'Current charge carriers moving perpendicular to the magnetic field experience a sideways magnetic force F = Bqv. This deflects carriers to one face of the semiconductor, establishing charge separation and a transverse electric field. Equilibrium is established when the electric force qE equals the magnetic force Bqv, creating the Hall voltage.',
        keyPoints: ['magnetic force deflects carriers', 'charge separation creates electric field', 'qE = Bqv at equilibrium'],
        examinerNotes: '3 standard B marks.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the number density n of charge carriers in the slice. (e = 1.60 × 10⁻¹⁹ C)',
        marks: 3,
        markScheme:
          'V_H = B I / (n t e)  =>  n = B I / (V_H t e) [C1]\nn = (0.800 × 0.150) / (4.50 × 10⁻³ × 0.200 × 10⁻³ × 1.60 × 10⁻¹⁹) [C1]\nn = 0.120 / (1.44 × 10⁻²⁵) = 8.33 × 10²³ m⁻³ [A1].',
        modelAnswer:
          'V_H = BI / (nte)  =>  n = BI / (V_H t e)\nn = (0.800 × 0.150) / (0.00450 × 0.000200 × 1.60 × 10⁻¹⁹) = 8.33 × 10²³ m⁻³.',
        keyPoints: ['n = BI / (V_H t e)', '8.33 × 10²³ m⁻³'],
        examinerNotes: 'Convert mm to m and mV to V.',
        calculatedAnswer: {
          value: '8.33e23',
          unit: 'm⁻³',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Explain why semiconductors are used for Hall probes rather than good metals such as copper.',
        marks: 1,
        markScheme:
          'Semiconductors have a much lower charge carrier density n, resulting in a much larger, measurable Hall voltage (since V_H ∝ 1/n) [B1].',
        modelAnswer:
          'Because Hall voltage is inversely proportional to carrier density (V_H ∝ 1/n), semiconductors (with much lower n than metals) produce a much larger, easily measurable Hall voltage.',
        keyPoints: ['lower n gives larger measurable Hall voltage'],
        examinerNotes: 'V_H is inversely proportional to n.',
      },
    ],
  },

  // --- Q22: Motional EMF & Rails ---
  {
    id: 'p4_q22_motional_emf',
    topic: 'Electromagnetic Induction',
    title: 'Q22. Motional EMF and Terminal Velocity of Sliding Rod',
    totalMarks: 8,
    context:
      'A conducting rod of length L = 0.400 m and mass m = 0.120 kg slides on frictionless horizontal rails in uniform vertical field B = 0.650 T. The circuit resistance is R = 2.50 Ω. A constant horizontal pulling force F_pull = 0.800 N is applied.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Show that the motional e.m.f. induced in the rod moving at speed v is E = BLv.',
        marks: 2,
        markScheme:
          'In time Δt, area swept is ΔA = L v Δt [C1]\nChange in flux ΔΦ = B ΔA = B L v Δt. By Faraday law E = ΔΦ/Δt = BLv [A1].',
        modelAnswer:
          'In time Δt, the rod moves distance Δx = v Δt, sweeping out area ΔA = L Δx = L v Δt.\nRate of change of magnetic flux is dΦ/dt = B (dA/dt) = B L v.\nBy Faraday’s law, E = dΦ/dt = B L v.',
        keyPoints: ['area swept ΔA = L v Δt', 'dΦ/dt = BLv'],
        examinerNotes: 'Standard derivation.',
      },
      {
        partId: '(b)',
        questionText:
          'Show that the opposing magnetic braking force on the rod is F_mag = (B² L² v) / R.',
        marks: 2,
        markScheme:
          'Induced current I = E / R = (BLv) / R [C1]\nMagnetic force F_mag = B I L = B ((BLv)/R) L = (B² L² v) / R [A1].',
        modelAnswer:
          'Induced current is I = E / R = (B L v) / R.\nBy Laplace force law, F_mag = B I L = B ((B L v) / R) L = (B² L² v) / R.\nBy Lenz’s law, this opposes the motion.',
        keyPoints: ['I = BLv/R', 'F = BIL = B²L²v/R'],
        examinerNotes: 'Clear substitution required.',
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the terminal velocity v_term reached by the rod.',
        marks: 2,
        markScheme:
          'At terminal velocity, F_pull = F_mag  =>  0.800 = (0.650² × 0.400² × v_term) / 2.50 [C1]\n0.800 = (0.0676 × v_term) / 2.50  =>  v_term = (0.800 × 2.50) / 0.0676 = 29.6 m s⁻¹ [A1].',
        modelAnswer:
          'At terminal speed, net acceleration is zero: F_pull = (B² L² v_term) / R\nv_term = (F_pull × R) / (B² L²) = (0.800 × 2.50) / (0.650² × 0.400²) = 2.00 / 0.0676 = 29.6 m s⁻¹.',
        keyPoints: ['F_pull = B²L²v/R', '29.6 m s⁻¹'],
        examinerNotes: '29.6 m s⁻¹.',
        calculatedAnswer: {
          value: '29.6',
          unit: 'm s⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'Verify that mechanical power input equals electrical power dissipated at terminal velocity.',
        marks: 2,
        markScheme:
          'P_mech = F_pull × v_term = 0.800 × 29.59 = 23.7 W [B1]\nP_elec = I² R = (BLv/R)² R = (B² L² v²) / R = (0.0676 × 29.59²) / 2.50 = 23.7 W [B1].',
        modelAnswer:
          'Mechanical power input: P_mech = F_pull × v = 0.800 × 29.59 = 23.7 W.\nElectrical heating power: P_elec = I² R = (B L v / R)² R = (B² L² v²) / R = (0.0676 × 875.6) / 2.50 = 23.7 W.\nBoth powers are equal, proving energy conservation.',
        keyPoints: ['P_mech = F v = 23.7 W', 'P_elec = I²R = 23.7 W'],
        examinerNotes: 'Energy conservation verified.',
      },
    ],
  },

  // --- Q23: RMS and Transformer ---
  {
    id: 'p4_q23_rms_rectifier',
    topic: 'Alternating Currents',
    title: 'Q23. Full-Wave Bridge Rectifier with Smoothing',
    totalMarks: 7,
    context:
      'A step-down transformer delivers an alternating sinusoidal voltage of r.m.s. value V_rms = 9.00 V at frequency f = 50.0 Hz to a full-wave bridge rectifier with smoothing capacitor C = 2200 μF and load resistor R = 180 Ω.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Calculate the peak voltage V₀ of the alternating supply.',
        marks: 2,
        markScheme:
          'V₀ = V_rms × √2 = 9.00 × 1.414 = 12.7 V [A1].',
        modelAnswer:
          'V₀ = V_rms × √2 = 9.00 × 1.4142 = 12.7 V.',
        keyPoints: ['V₀ = V_rms √2', '12.7 V'],
        examinerNotes: '12.7 V.',
        calculatedAnswer: {
          value: '12.7',
          unit: 'V',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)',
        questionText:
          'State the frequency of the ripple voltage in a full-wave rectified supply with 50 Hz input.',
        marks: 1,
        markScheme: '100 Hz (double the input frequency) [B1].',
        modelAnswer: '100 Hz (both half-cycles are rectified, doubling ripple frequency).',
        keyPoints: ['100 Hz'],
        examinerNotes: '100 Hz.',
      },
      {
        partId: '(c)',
        questionText:
          'Estimate the ripple voltage ΔV across the capacitor. (Hint: ΔV ≈ I / (2f C)).',
        marks: 3,
        markScheme:
          'Mean current I ≈ V₀ / R = 12.7 / 180 = 0.0706 A [C1]\nTime between peaks Δt = 1 / (2f) = 1 / 100 = 0.0100 s [C1]\nΔV ≈ I Δt / C = (0.0706 × 0.0100) / (2200 × 10⁻⁶) = 0.321 V [A1].',
        modelAnswer:
          'I ≈ 12.7 / 180 = 0.07056 A\nΔt = 1 / 100 = 0.0100 s\nΔV ≈ (0.07056 × 0.0100) / (2200 × 10⁻⁶) = 0.321 V (approx 0.32 V).',
        keyPoints: ['I = V/R', 'Δt = 0.01 s', '0.32 V'],
        examinerNotes: '0.32 V.',
        calculatedAnswer: {
          value: '0.32',
          unit: 'V',
          tolerance: 0.05,
          sf: 2,
        },
      },
      {
        partId: '(d)',
        questionText:
          'State two modifications to reduce the ripple voltage.',
        marks: 1,
        markScheme:
          'Increase capacitance C of the smoothing capacitor OR increase resistance R of load [B1].',
        modelAnswer: '1. Use a capacitor with larger capacitance C. 2. Increase the load resistance R.',
        keyPoints: ['increase C or increase R'],
        examinerNotes: 'Either increase C or increase R.',
      },
    ],
  },

  // --- Q24: Photoelectric Effect ---
  {
    id: 'p4_q24_photoelectric',
    topic: 'Quantum Physics',
    title: 'Q24. Photoelectric Effect and Stopping Potential',
    totalMarks: 9,
    context:
      'Monochromatic ultraviolet radiation of wavelength λ = 240 nm is incident on a clean zinc surface in an evacuated tube. The work function energy of zinc is Φ = 4.30 eV. (h = 6.63 × 10⁻³⁴ J s, c = 3.00 × 10⁸ m s⁻¹, 1 eV = 1.60 × 10⁻¹⁹ J).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Calculate the photon energy of the incident UV radiation in electron-volts (eV).',
        marks: 3,
        markScheme:
          'E = h c / λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (240 × 10⁻⁹) = 8.288 × 10⁻¹⁹ J [C1]\nE(eV) = (8.288 × 10⁻¹⁹) / (1.60 × 10⁻¹⁹) = 5.18 eV [A1].',
        modelAnswer:
          'E = hc / λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (2.40 × 10⁻⁷) = 8.288 × 10⁻¹⁹ J\nE = 8.288 × 10⁻¹⁹ / 1.60 × 10⁻¹⁹ = 5.18 eV.',
        keyPoints: ['E = hc/λ', '5.18 eV'],
        examinerNotes: '5.18 eV.',
        calculatedAnswer: {
          value: '5.18',
          unit: 'eV',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the maximum kinetic energy E_k(max) of emitted photoelectrons and the stopping potential V_s.',
        marks: 3,
        markScheme:
          'E_k(max) = hf - Φ = 5.18 - 4.30 = 0.88 eV (or 1.41 × 10⁻¹⁹ J) [A1]\nStopping potential V_s = E_k(max) / e = 0.88 V [A1].',
        modelAnswer:
          'E_k(max) = hf - Φ = 5.18 eV - 4.30 eV = 0.88 eV (1.41 × 10⁻¹⁹ J)\nStopping potential V_s = 0.88 V.',
        keyPoints: ['Ek = hf - Φ = 0.88 eV', 'Vs = 0.88 V'],
        examinerNotes: '0.88 eV and 0.88 V.',
        calculatedAnswer: {
          value: '0.88',
          unit: 'V',
          tolerance: 0.02,
          sf: 2,
        },
      },
      {
        partId: '(c)',
        questionText:
          'State and explain the effect on the maximum kinetic energy and the saturation photocurrent if the intensity of radiation is doubled at constant wavelength.',
        marks: 3,
        markScheme:
          'Max kinetic energy is unchanged (depends only on photon energy / frequency, not intensity) [B1]\nSaturation photocurrent doubles because photon arrival rate doubles, emitting twice as many photoelectrons per second [B1].',
        modelAnswer:
          'Max kinetic energy remains completely unchanged because each electron absorbs only a single photon, and photon energy E = hf is unchanged. The saturation photocurrent doubles because doubling intensity doubles the photon arrival rate per second, releasing twice as many photoelectrons per unit time.',
        keyPoints: ['max Ek unchanged', 'photocurrent doubles'],
        examinerNotes: 'Classic evidence for quantum theory.',
      },
    ],
  },

  // --- Q25: De Broglie & Electron Diffraction ---
  {
    id: 'p4_q25_de_broglie',
    topic: 'Quantum Physics',
    title: 'Q25. De Broglie Wavelength and Electron Diffraction',
    totalMarks: 7,
    context:
      'Electrons of mass m = 9.11 × 10⁻³¹ kg are accelerated from rest through potential difference V = 150 V and pass through a thin graphite film.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State what experimental evidence proves that electrons exhibit wave-like behavior.',
        marks: 1,
        markScheme: 'Electron diffraction rings formed on fluorescent screen [B1].',
        modelAnswer: 'Electron diffraction patterns (concentric circular rings) observed when an electron beam passes through thin graphite films.',
        keyPoints: ['electron diffraction rings'],
        examinerNotes: 'Diffraction is a uniquely wave phenomenon.',
      },
      {
        partId: '(b)',
        questionText:
          'Show that the de Broglie wavelength λ of an electron accelerated through potential difference V is given by λ = h / √(2m e V).',
        marks: 2,
        markScheme:
          'Kinetic energy 1/2 m v² = e V  =>  p² / (2m) = e V  =>  p = √(2m e V) [C1]\nλ = h / p = h / √(2m e V) [A1].',
        modelAnswer:
          'Gain in kinetic energy: Ek = p² / (2m) = eV  =>  momentum p = √(2m e V)\nDe Broglie wavelength: λ = h / p = h / √(2m e V).',
        keyPoints: ['p = √(2meV)', 'λ = h/p = h/√(2meV)'],
        examinerNotes: 'Show momentum substitution.',
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the de Broglie wavelength λ for electrons accelerated through 150 V.',
        marks: 2,
        markScheme:
          'λ = (6.63 × 10⁻³⁴) / √[2 × (9.11 × 10⁻³¹) × (1.60 × 10⁻¹⁹) × 150] [C1]\n= (6.63 × 10⁻³⁴) / (6.61 × 10⁻²⁴) = 1.00 × 10⁻¹⁰ m (0.100 nm) [A1].',
        modelAnswer:
          'p = √(2 × 9.11 × 10⁻³¹ × 1.60 × 10⁻¹⁹ × 150) = 6.612 × 10⁻²⁴ kg m s⁻¹\nλ = 6.63 × 10⁻³⁴ / 6.612 × 10⁻²⁴ = 1.00 × 10⁻¹⁰ m (0.100 nm).',
        keyPoints: ['1.00 × 10⁻¹⁰ m'],
        examinerNotes: 'Matches interatomic lattice spacing of graphite.',
        calculatedAnswer: {
          value: '1.00e-10',
          unit: 'm',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'Describe how the diffraction rings change when the accelerating voltage V is increased.',
        marks: 2,
        markScheme:
          'Higher V increases momentum p, so de Broglie wavelength λ decreases [B1]\nSmaller wavelength results in smaller diffraction angles, so ring radii contract / decrease [B1].',
        modelAnswer:
          'Increasing V increases electron momentum, which decreases the de Broglie wavelength (λ = h/p). A shorter wavelength undergoes less diffraction (sin θ ≈ λ/d), causing the rings to contract to smaller radii.',
        keyPoints: ['λ decreases', 'ring radii decrease / contract'],
        examinerNotes: 'Rings contract.',
      },
    ],
  },

  // --- Q26: Energy Levels Hydrogen ---
  {
    id: 'p4_q26_hydrogen_levels',
    topic: 'Quantum Physics',
    title: 'Q26. Hydrogen Energy Levels and Absorption Spectra',
    totalMarks: 8,
    context:
      'The discrete energy levels of atomic hydrogen are given by E_n = -13.6 / n² eV. A photon of wavelength λ = 102.6 nm is absorbed by a ground-state hydrogen atom (n = 1).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Explain why energy levels in an atom are negative.',
        marks: 2,
        markScheme:
          'Energy is defined to be zero when electron is at infinity / completely removed (ionised) [B1]\nBecause electrostatic attraction binds electron to nucleus, energy must be added to free it, making bound states negative [B1].',
        modelAnswer:
          'The reference zero of energy is defined when the electron is completely removed from the atom to infinity. Because the nucleus exerts an attractive electrostatic force, energy must be supplied to liberate the electron, so bound electrons have less than zero energy (negative).',
        keyPoints: ['zero at infinity', 'attractive force binds electron'],
        examinerNotes: 'Zero at infinity explanation required.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the energy of the incident photon in eV and determine the principal quantum number n of the excited state.',
        marks: 4,
        markScheme:
          'E = h c / λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (102.6 × 10⁻⁹) = 1.939 × 10⁻¹⁸ J [C1]\nE(eV) = (1.939 × 10⁻¹⁸) / (1.60 × 10⁻¹⁹) = 12.1 eV [A1]\nFinal energy E_final = E₁ + 12.1 = -13.6 + 12.1 = -1.51 eV [C1]\n-13.6 / n² = -1.51  =>  n² = 9  =>  n = 3 [A1].',
        modelAnswer:
          'Photon energy E = hc / λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (1.026 × 10⁻⁷) = 1.9386 × 10⁻¹⁸ J = 12.11 eV\nE_final = -13.6 + 12.11 = -1.51 eV\nSince E_n = -13.6 / n², n = √(-13.6 / -1.51) = √9 = 3.',
        keyPoints: ['E = 12.1 eV', 'E_final = -1.51 eV', 'n = 3'],
        examinerNotes: 'n = 3.',
        calculatedAnswer: {
          value: '3',
          unit: '',
          tolerance: 0.01,
          sf: 1,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Determine the number of possible emission spectral lines as the atom de-excites from n = 3 back to the ground state.',
        marks: 2,
        markScheme:
          'Transitions: 3 -> 2, 2 -> 1, and 3 -> 1 [B1]\nTotal number of emission lines = 3 [B1].',
        modelAnswer:
          'Three possible transitions: n=3 to n=2 (visible Balmer line), n=2 to n=1 (UV Lyman line), and n=3 to n=1 (UV Lyman line). Total of 3 emission lines.',
        keyPoints: ['3 lines', '3->2, 2->1, 3->1'],
        examinerNotes: '3 lines.',
      },
    ],
  },

  // --- Q27: Binding Energy Curve ---
  {
    id: 'p4_q27_binding_energy_curve',
    topic: 'Nuclear Physics',
    title: 'Q27. Binding Energy per Nucleon and Fission vs Fusion',
    totalMarks: 8,
    context:
      'The binding energy per nucleon curve peaks at iron-56 (⁵⁶₂₆Fe) with value ~8.8 MeV per nucleon. Uranium-235 undergoes induced nuclear fission: ²³⁵₉₂U + ¹₀n -> ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n.',
    parts: [
      {
        partId: '(a)',
        questionText: 'Define binding energy of a nucleus.',
        marks: 2,
        markScheme:
          'Minimum energy required to separate all constituent nucleons of a nucleus to infinity [B1].',
        modelAnswer: 'The minimum energy required to completely separate all the constituent nucleons of a nucleus to infinity.',
        keyPoints: ['minimum energy', 'separate all nucleons to infinity'],
        examinerNotes: "Do not write 'energy holding nucleus together'.",
      },
      {
        partId: '(b)',
        questionText:
          'Use the binding energy per nucleon curve to explain why energy is released in both nuclear fission of heavy nuclei and nuclear fusion of light nuclei.',
        marks: 3,
        markScheme:
          'Iron-56 has the maximum binding energy per nucleon [B1]\nIn fission, heavy nuclei split into fragments with higher binding energy per nucleon, releasing energy [B1]\nIn fusion, light nuclei fuse into a heavier nucleus with significantly higher binding energy per nucleon, releasing energy [B1].',
        modelAnswer:
          'Iron-56 sits at the maximum peak of the binding energy per nucleon curve. Whenever a nuclear reaction produces daughter nuclei with higher binding energy per nucleon than reactants, total mass decreases and energy is released (ΔE = Δm·c²). In fission, splitting heavy uranium moves up towards iron-56. In fusion, joining light hydrogen/helium moves up steeply towards iron-56.',
        keyPoints: ['Fe-56 has max BE per nucleon', 'fission moves up to peak', 'fusion moves steeply up to peak'],
        examinerNotes: 'Highlight that products have higher binding energy per nucleon.',
      },
      {
        partId: '(c)',
        questionText:
          'Average BE per nucleon: U-235 = 7.60 MeV, Ba-141 = 8.30 MeV, Kr-92 = 8.50 MeV. Calculate the energy released in this single fission event.',
        marks: 3,
        markScheme:
          'Total BE before = 235 × 7.60 = 1786 MeV [C1]\nTotal BE after = (141 × 8.30) + (92 × 8.50) = 1170.3 + 782.0 = 1952.3 MeV [C1]\nEnergy released ΔE = 1952.3 - 1786.0 = 166 MeV [A1].',
        modelAnswer:
          'BE of U-235 = 235 × 7.60 MeV = 1786.0 MeV\nBE of products = (141 × 8.30) + (92 × 8.50) = 1170.3 + 782.0 = 1952.3 MeV\nEnergy released = BE_after - BE_before = 1952.3 - 1786.0 = 166 MeV (approx 170 MeV).',
        keyPoints: ['BE before = 1786 MeV', 'BE after = 1952 MeV', '166 MeV'],
        examinerNotes: '166 MeV.',
        calculatedAnswer: {
          value: '166',
          unit: 'MeV',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q28: Fusion D-T Tokamak ---
  {
    id: 'p4_q28_fusion_tokamak',
    topic: 'Nuclear Physics',
    title: 'Q28. Deuterium-Tritium Fusion Reaction and Mass Defect',
    totalMarks: 7,
    context:
      'The deuterium-tritium fusion reaction is: ²₁H + ³₁H -> ⁴₂He + ¹₀n. Masses: m(²₁H) = 2.01410 u, m(³₁H) = 3.01605 u, m(⁴₂He) = 4.00260 u, m(¹₀n) = 1.00866 u. (1 u = 931.5 MeV).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Calculate the mass defect Δm of the reaction in atomic mass units (u).',
        marks: 2,
        markScheme:
          'Mass before = 2.01410 + 3.01605 = 5.03015 u [C1]\nMass after = 4.00260 + 1.00866 = 5.01126 u\nΔm = 5.03015 - 5.01126 = 0.01889 u [A1].',
        modelAnswer:
          'Mass reactants = 2.01410 + 3.01605 = 5.03015 u\nMass products = 4.00260 + 1.00866 = 5.01126 u\nMass defect Δm = 5.03015 - 5.01126 = 0.01889 u.',
        keyPoints: ['Δm = 0.01889 u'],
        examinerNotes: '0.01889 u.',
        calculatedAnswer: {
          value: '0.01889',
          unit: 'u',
          tolerance: 0.01,
          sf: 4,
        },
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the energy released in MeV and in Joules.',
        marks: 3,
        markScheme:
          'E = 0.01889 u × 931.5 MeV/u = 17.6 MeV [A1]\nIn Joules: 17.6 × 10⁶ × 1.60 × 10⁻¹⁹ = 2.82 × 10⁻¹² J [A1].',
        modelAnswer:
          'E = 0.01889 × 931.5 = 17.6 MeV\nIn Joules: E = 17.6 × 10⁶ × 1.60 × 10⁻¹⁹ = 2.82 × 10⁻¹² J.',
        keyPoints: ['17.6 MeV', '2.82 × 10⁻¹² J'],
        examinerNotes: '17.6 MeV and 2.82 × 10⁻¹² J.',
        calculatedAnswer: {
          value: '17.6',
          unit: 'MeV',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Explain why extremely high temperatures (> 10⁷ K) are required for nuclear fusion to occur.',
        marks: 2,
        markScheme:
          'Positively charged nuclei experience strong electrostatic Coulomb repulsion [B1]\nExtremely high temperatures give nuclei sufficiently high kinetic energy to overcome electrostatic repulsion and reach within range of the strong nuclear force [B1].',
        modelAnswer:
          'Positively charged nuclei repel each other via electrostatic Coulomb repulsion. Very high temperatures provide the nuclei with tremendous kinetic energies (E_k ≈ 3/2 kT) allowing them to overcome this electrostatic repulsion barrier and approach within the ~10⁻¹⁵ m range where the strong attractive nuclear force binds them.',
        keyPoints: ['overcome electrostatic Coulomb repulsion', 'reach range of strong nuclear force'],
        examinerNotes: 'Coulomb repulsion + strong force range.',
      },
    ],
  },

  // --- Q29: Carbon-14 Dating ---
  {
    id: 'p4_q29_carbon_dating',
    topic: 'Nuclear Physics',
    title: 'Q29. Carbon-14 Dating of Archaeological Artifact',
    totalMarks: 7,
    context:
      'Carbon-14 has half-life t_1/2 = 5730 years. Living wood has activity A₀ = 15.3 counts per minute per gram of carbon. An ancient wooden artifact has activity A = 4.20 counts per minute per gram.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Calculate the decay constant λ of carbon-14 in year⁻¹.',
        marks: 2,
        markScheme:
          'λ = ln(2) / t_1/2 = 0.69315 / 5730 = 1.21 × 10⁻⁴ year⁻¹ [A1].',
        modelAnswer:
          'λ = ln(2) / 5730 = 1.21 × 10⁻⁴ year⁻¹.',
        keyPoints: ['λ = ln(2)/t_1/2', '1.21 × 10⁻⁴ year⁻¹'],
        examinerNotes: '1.21 × 10⁻⁴ year⁻¹.',
        calculatedAnswer: {
          value: '1.21e-4',
          unit: 'year⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the age of the wooden artifact in years.',
        marks: 3,
        markScheme:
          'A = A₀ e^(-λt)  =>  4.20 = 15.3 e^(-λt) [C1]\nln(4.20 / 15.3) = -λt  =>  -1.2927 = -(1.2097 × 10⁻⁴) t [C1]\nt = 1.2927 / (1.2097 × 10⁻⁴) = 1.07 × 10⁴ years (10,700 years) [A1].',
        modelAnswer:
          'A / A₀ = 4.20 / 15.3 = 0.2745\nln(0.2745) = -1.2927\nt = 1.2927 / (1.2097 × 10⁻⁴) = 1.07 × 10⁴ years (10,700 years).',
        keyPoints: ['A = A₀ e^(-λt)', '1.07 × 10⁴ years'],
        examinerNotes: '10,700 years.',
        calculatedAnswer: {
          value: '1.07e4',
          unit: 'years',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'State one assumption made in carbon-14 dating that can introduce uncertainty.',
        marks: 2,
        markScheme:
          'Assumes the ratio of carbon-14 to carbon-12 in the atmosphere was constant over time [B1]\nAssumes no carbon contamination entered or left the artifact after death [B1].',
        modelAnswer:
          'It is assumed that the atmospheric ratio of carbon-14 to carbon-12 has remained constant over the past 11,000 years, and that no modern carbon has contaminated the sample.',
        keyPoints: ['constant atmospheric C-14 ratio', 'no contamination'],
        examinerNotes: 'Assumption of constant C-14 ratio in atmosphere.',
      },
    ],
  },

  // --- Q30: Ultrasound Acoustic Impedance ---
  {
    id: 'p4_q30_ultrasound',
    topic: 'Medical Physics',
    title: 'Q30. Ultrasound Reflection at Tissue Boundaries and Coupling Gel',
    totalMarks: 8,
    context:
      'Acoustic impedance values: Air Z₁ = 430 kg m⁻² s⁻¹, Muscle Z₂ = 1.70 × 10⁶ kg m⁻² s⁻¹, Fat Z₃ = 1.38 × 10⁶ kg m⁻² s⁻¹.',
    parts: [
      {
        partId: '(a)',
        questionText: 'Define acoustic impedance Z.',
        marks: 1,
        markScheme:
          'Product of density of medium and speed of ultrasound in medium [B1] (Z = ρc).',
        modelAnswer: 'The product of the density of the medium and the speed of the ultrasound wave in that medium (Z = ρc).',
        keyPoints: ['product of density and speed of ultrasound'],
        examinerNotes: "Z = ρc.",
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the intensity reflection coefficient α at an air-muscle boundary without coupling gel.',
        marks: 3,
        markScheme:
          'α = (Z₂ - Z₁)² / (Z₂ + Z₁)² [C1]\n= (1.70 × 10⁶ - 430)² / (1.70 × 10⁶ + 430)² [C1]\n= (1.69957 × 10⁶)² / (1.70043 × 10⁶)² = 0.9990 (99.9%) [A1].',
        modelAnswer:
          'α = (Z₂ - Z₁)² / (Z₂ + Z₁)²\nα = (1.70 × 10⁶ - 430)² / (1.70 × 10⁶ + 430)² = 0.9990 (99.9%).\nAlmost 100% of the ultrasound is reflected back!',
        keyPoints: ['α = (Z₂ - Z₁)² / (Z₂ + Z₁)²', '0.999 (99.9%)'],
        examinerNotes: '99.9% reflection.',
        calculatedAnswer: {
          value: '0.999',
          unit: '',
          tolerance: 0.01,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Explain why coupling gel is applied to the skin and calculate α at a fat-muscle boundary.',
        marks: 4,
        markScheme:
          'Coupling gel has acoustic impedance matching skin/tissue, eliminating air gaps and preventing total reflection at the skin surface [B1]\nAt fat-muscle boundary: α = (1.70 × 10⁶ - 1.38 × 10⁶)² / (1.70 × 10⁶ + 1.38 × 10⁶)² [C1]\n= (0.32 × 10⁶)² / (3.08 × 10⁶)² = 0.0108 (approx 1.1%) [A1]\nThis allows ~99% transmission to image deeper organs while returning a clear echo from the boundary [B1].',
        modelAnswer:
          'Coupling gel matches the acoustic impedance of skin, excluding air pockets so virtually all ultrasound penetrates into the body.\nAt the fat-muscle boundary: α = (1.70 - 1.38)² / (1.70 + 1.38)² = (0.32)² / (3.08)² = 0.0108 (1.08%).\nA small echo is reflected to form the image, while 98.9% continues deeper into tissues.',
        keyPoints: ['gel eliminates air gap', 'α = 0.0108 (1.1%)', 'transmits into deeper tissues'],
        examinerNotes: '1.08% reflection allows deep penetration.',
        calculatedAnswer: {
          value: '0.0108',
          unit: '',
          tolerance: 0.05,
          sf: 3,
        },
      },
    ],
  },

  // --- Q31: X-Ray Attenuation ---
  {
    id: 'p4_q31_xray_attenuation',
    topic: 'Medical Physics',
    title: 'Q31. X-Ray Attenuation and Half-Value Thickness',
    totalMarks: 7,
    context:
      'A parallel beam of X-rays passes through bone with linear attenuation coefficient μ_bone = 0.600 cm⁻¹ and muscle with μ_muscle = 0.200 cm⁻¹.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State the equation for X-ray attenuation and define the half-value thickness x_1/2.',
        marks: 2,
        markScheme:
          'I = I₀ e^(-μx) [B1]\nHalf-value thickness is the thickness of absorber required to reduce the X-ray intensity to half its initial value: x_1/2 = ln(2) / μ [B1].',
        modelAnswer:
          'Attenuation equation: I = I₀ e^(-μx).\nHalf-value thickness (x_1/2) is the thickness of material required to reduce the transmitted intensity of the X-ray beam to 50% of its incident intensity (x_1/2 = ln 2 / μ).',
        keyPoints: ['I = I₀ e^(-μx)', 'thickness to halve intensity'],
        examinerNotes: 'x_1/2 = ln 2 / μ.',
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the half-value thickness of bone.',
        marks: 2,
        markScheme:
          'x_1/2 = ln(2) / μ = 0.69315 / 0.600 = 1.16 cm [A1].',
        modelAnswer:
          'x_1/2 = ln(2) / 0.600 = 1.16 cm.',
        keyPoints: ['x_1/2 = 1.16 cm'],
        examinerNotes: '1.16 cm.',
        calculatedAnswer: {
          value: '1.16',
          unit: 'cm',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Calculate the ratio of transmitted intensity through 3.00 cm of bone compared to 3.00 cm of muscle.',
        marks: 3,
        markScheme:
          'I_bone = I₀ e^(-0.600 × 3.00) = I₀ e^(-1.80) = 0.1653 I₀ [C1]\nI_muscle = I₀ e^(-0.200 × 3.00) = I₀ e^(-0.600) = 0.5488 I₀ [C1]\nRatio I_bone / I_muscle = 0.1653 / 0.5488 = 0.301 [A1].',
        modelAnswer:
          'I_bone / I₀ = e^(-0.600 × 3.00) = 0.1653\nI_muscle / I₀ = e^(-0.200 × 3.00) = 0.5488\nRatio = 0.1653 / 0.5488 = 0.301 (bone transmits only ~30% as much intensity as muscle, creating strong shadow contrast).',
        keyPoints: ['I_bone = 0.165 I₀', 'I_muscle = 0.549 I₀', 'ratio = 0.301'],
        examinerNotes: '0.301.',
        calculatedAnswer: {
          value: '0.301',
          unit: '',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // --- Q32: CT Scanning ---
  {
    id: 'p4_q32_ct_scan',
    topic: 'Medical Physics',
    title: 'Q32. Computed Tomography (CT) Principles',
    totalMarks: 7,
    context:
      'Computed Tomography (CT) scans produce 3D cross-sectional images using rotated X-ray projections processed by computers.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State two principal advantages of a CT scan compared to a conventional X-ray radiograph.',
        marks: 2,
        markScheme:
          '1. Produces cross-sectional 3D slices with no overlapping of tissue structures [B1]\n2. Much higher contrast resolution capable of distinguishing between soft tissues with similar densities [B1].',
        modelAnswer:
          '1. Produces 3D cross-sectional slice images without shadowing or overlapping of anatomical structures.\n2. Provides superior soft tissue contrast resolution, differentiating tissues with very similar attenuation coefficients.',
        keyPoints: ['3D cross-sectional slices with no overlap', 'higher soft-tissue contrast'],
        examinerNotes: 'No overlapping + soft tissue contrast.',
      },
      {
        partId: '(b)',
        questionText:
          'Outline how a CT scan image is created from multiple X-ray projections.',
        marks: 3,
        markScheme:
          '1. X-ray tube and detectors rotate around the patient in a single plane [B1]\n2. Multiple narrow X-ray beams take attenuation measurements from numerous angles [B1]\n3. Computer algorithms calculate attenuation coefficients of individual pixels/voxels in the slice matrix [B1].',
        modelAnswer:
          'An X-ray tube and detector array rotate around the patient, directing fan-shaped X-ray beams through a single plane from many different angles. Detectors measure transmitted intensity profiles across all angles. A computer uses filtered back-projection algorithms to solve for the linear attenuation coefficient of every voxel in the slice matrix, reconstructing a detailed cross-sectional image.',
        keyPoints: ['rotates around patient', 'measurements from many angles', 'computer calculates pixel attenuation coefficients'],
        examinerNotes: '3 standard marks on rotation, multi-angle beams, computer voxel calculation.',
      },
      {
        partId: '(c)',
        questionText:
          'State one major disadvantage of a CT scan.',
        marks: 2,
        markScheme:
          'Delivers a significantly higher dose of ionising radiation to the patient compared to standard radiography [B1], increasing long-term cancer risk [B1].',
        modelAnswer:
          'The radiation dose is significantly higher (often 100 to 1000 times greater than a single planar radiograph), increasing cumulative ionising radiation exposure risk.',
        keyPoints: ['significantly higher radiation dose'],
        examinerNotes: 'Radiation dose risk.',
      },
    ],
  },

  // --- Q33: Astronomy Wien & Stefan-Boltzmann ---
  {
    id: 'p4_q33_astronomy_stars',
    topic: 'Astronomy & Cosmology',
    title: 'Q33. Stefan-Boltzmann Law and Wien’s Displacement for Betelgeuse',
    totalMarks: 8,
    context:
      'The red supergiant star Betelgeuse has peak emission wavelength λ_max = 828 nm and radiant flux intensity at Earth F = 2.05 × 10⁻⁷ W m⁻². Distance to Betelgeuse is d = 642 light-years (6.07 × 10¹⁸ m). (σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Use Wien’s displacement law to calculate the surface temperature T of Betelgeuse. (Wien constant = 2.898 × 10⁻³ m K).',
        marks: 2,
        markScheme:
          'T = 2.898 × 10⁻³ / λ_max = (2.898 × 10⁻³) / (828 × 10⁻⁹) = 3.50 × 10³ K [A1].',
        modelAnswer:
          'T = 2.898 × 10⁻³ / (8.28 × 10⁻⁷ m) = 3.50 × 10³ K (3500 K).',
        keyPoints: ['T = 2.898 × 10⁻³ / λ_max', '3.50 × 10³ K'],
        examinerNotes: '3500 K.',
        calculatedAnswer: {
          value: '3500',
          unit: 'K',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the total luminosity L of Betelgeuse.',
        marks: 3,
        markScheme:
          'F = L / (4π d²)  =>  L = 4π d² F [C1]\nL = 4π × (6.07 × 10¹⁸)² × (2.05 × 10⁻⁷) = 4π × (3.684 × 10³⁷) × (2.05 × 10⁻⁷) [C1]\nL = 9.49 × 10³¹ W [A1].',
        modelAnswer:
          'L = 4π d² F = 4π × (6.07 × 10¹⁸ m)² × (2.05 × 10⁻⁷ W m⁻²) = 9.49 × 10³¹ W.',
        keyPoints: ['L = 4π d² F', '9.49 × 10³¹ W'],
        examinerNotes: '9.49 × 10³¹ W (~25,000 solar luminosities).',
        calculatedAnswer: {
          value: '9.49e31',
          unit: 'W',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Use the Stefan-Boltzmann law L = 4π R² σ T⁴ to calculate the radius R of Betelgeuse in solar radii (R_sun = 6.96 × 10⁸ m).',
        marks: 3,
        markScheme:
          'R² = L / (4π σ T⁴) = (9.49 × 10³¹) / (4π × 5.67 × 10⁻⁸ × 3500⁴) [C1]\n= (9.49 × 10³¹) / (1.071 × 10⁸) = 8.86 × 10²³ m²  =>  R = 9.41 × 10¹¹ m [C1]\nR / R_sun = (9.41 × 10¹¹) / (6.96 × 10⁸) = 1.35 × 10³ (approx 1350 R_sun) [A1].',
        modelAnswer:
          'R = √[L / (4π σ T⁴)] = √[(9.49 × 10³¹) / (4π × 5.67 × 10⁻⁸ × 3500⁴)] = 9.41 × 10¹¹ m\nIn solar radii: R = 9.41 × 10¹¹ / 6.96 × 10⁸ = 1.35 × 10³ R_sun.',
        keyPoints: ['R = √[L / 4πσT⁴]', '9.41 × 10¹¹ m', '1350 R_sun'],
        examinerNotes: 'Demonstrates why it is a red supergiant.',
        calculatedAnswer: {
          value: '9.41e11',
          unit: 'm',
          tolerance: 0.03,
          sf: 3,
        },
      },
    ],
  },

  // --- Q34: Hubble's Law & Redshift ---
  {
    id: 'p4_q34_hubbles_law',
    topic: 'Astronomy & Cosmology',
    title: 'Q34. Hubble’s Law and Cosmological Redshift',
    totalMarks: 7,
    context:
      'A spectral line of laboratory wavelength λ₀ = 486.1 nm (H-beta line) is observed in the light from a distant galaxy at wavelength λ = 510.4 nm. (c = 3.00 × 10⁸ m s⁻¹, Hubble constant H₀ = 2.40 × 10⁻¹⁸ s⁻¹).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Calculate the redshift z and the recession velocity v of the galaxy.',
        marks: 3,
        markScheme:
          'Δλ = 510.4 - 486.1 = 24.3 nm [C1]\nz = Δλ / λ₀ = 24.3 / 486.1 = 0.0500 [A1]\nv = z c = 0.0500 × (3.00 × 10⁸) = 1.50 × 10⁷ m s⁻¹ (15,000 km/s) [A1].',
        modelAnswer:
          'Redshift z = Δλ / λ₀ = (510.4 - 486.1) / 486.1 = 24.3 / 486.1 = 0.0500\nRecession speed v = z × c = 0.0500 × 3.00 × 10⁸ = 1.50 × 10⁷ m s⁻¹ (15,000 km s⁻¹).',
        keyPoints: ['z = 0.0500', 'v = 1.50 × 10⁷ m s⁻¹'],
        examinerNotes: '1.50 × 10⁷ m s⁻¹.',
        calculatedAnswer: {
          value: '1.50e7',
          unit: 'm s⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(b)',
        questionText:
          'Use Hubble’s law v = H₀ d to estimate the distance d to the galaxy in metres.',
        marks: 2,
        markScheme:
          'd = v / H₀ = (1.50 × 10⁷) / (2.40 × 10⁻¹⁸) = 6.25 × 10²⁴ m [A1].',
        modelAnswer:
          'd = v / H₀ = (1.50 × 10⁷ m s⁻¹) / (2.40 × 10⁻¹⁸ s⁻¹) = 6.25 × 10²⁴ m.',
        keyPoints: ['d = v/H₀', '6.25 × 10²⁴ m'],
        examinerNotes: '6.25 × 10²⁴ m.',
        calculatedAnswer: {
          value: '6.25e24',
          unit: 'm',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(c)',
        questionText:
          'Explain how Hubble’s law leads to an estimate for the age of the Universe.',
        marks: 2,
        markScheme:
          'Assuming galaxies have moved apart at constant speed since the Big Bang: d = v t  =>  t = d / v [B1]\nSince v = H₀ d, the age is t = 1 / H₀ ≈ 1 / (2.4 × 10⁻¹⁸) ≈ 4.17 × 10¹⁷ s (approx 13.2 billion years) [B1].',
        modelAnswer:
          'Assuming the expansion rate has been constant, a galaxy at distance d moving at speed v has been travelling for time t = d / v. Substituting Hubble’s law (d/v = 1/H₀) yields the age of the Universe as t ≈ 1 / H₀ = 1 / 2.40 × 10⁻¹⁸ s⁻¹ ≈ 4.17 × 10¹⁷ s ≈ 13.2 billion years.',
        keyPoints: ['t = 1/H₀', 'approx 13.2 billion years'],
        examinerNotes: 'Age of Universe ≈ 1 / H₀.',
      },
    ],
  },

  // --- Q35: Big Bang Evidence ---
  {
    id: 'p4_q35_big_bang_evidence',
    topic: 'Astronomy & Cosmology',
    title: 'Q35. Big Bang Evidence: CMBR and Redshift',
    totalMarks: 7,
    context:
      'Two major observational cornerstones provide evidence for the Big Bang model: the cosmological redshift of galaxies and the Cosmic Microwave Background Radiation (CMBR).',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State two key observational features of the Cosmic Microwave Background Radiation (CMBR).',
        marks: 2,
        markScheme:
          '1. Highly isotropic / uniform in all directions across the sky [B1]\n2. Follows a black-body spectrum corresponding to temperature 2.7 K [B1].',
        modelAnswer:
          '1. It is highly isotropic across the sky, arriving with nearly identical intensity from every direction.\n2. It has an ideal black-body radiation spectrum with peak corresponding to a temperature of 2.73 K.',
        keyPoints: ['isotropic / uniform in all directions', 'black body spectrum at 2.7 K'],
        examinerNotes: 'Isotropy and 2.7 K blackbody spectrum.',
      },
      {
        partId: '(b)',
        questionText:
          'Explain how the Big Bang theory explains the origin and the present 2.7 K temperature of the CMBR.',
        marks: 3,
        markScheme:
          '1. Radiation was emitted when the early hot, dense Universe became transparent to photons (recombination epoch) [B1]\n2. As space expanded, the wavelength of these photons was stretched by cosmological redshift [B1]\n3. Stretched wavelength corresponds to a significantly lower temperature by Wien’s law (cooled from ~3000 K to 2.7 K) [B1].',
        modelAnswer:
          'In the early Universe (~380,000 years after Big Bang), the plasma cooled sufficiently for neutral hydrogen atoms to form (recombination), decoupling radiation from matter. As space expanded over billions of years, the wavelength of this primordial radiation was stretched by the expansion factor of the Universe (cosmological redshift). By Wien’s displacement law, stretching the wavelengths cooled the black-body temperature from ~3000 K down to 2.7 K.',
        keyPoints: ['radiation decoupled at recombination', 'wavelength stretched by expansion', 'cooled from 3000 K to 2.7 K'],
        examinerNotes: '3 standard marks on emission, expansion stretching, and cooling.',
      },
      {
        partId: '(c)',
        questionText:
          'State why cosmological redshift differs from the standard Doppler effect.',
        marks: 2,
        markScheme:
          'Doppler shift is caused by motion of the source THROUGH space [B1]\nCosmological redshift is caused by the expansion of space itself stretching photons as they travel [B1].',
        modelAnswer:
          'Doppler redshift occurs when an object moves through static space relative to an observer. Cosmological redshift is caused by the expansion of space itself stretching the wavelength of light as it propagates across the expanding Universe.',
        keyPoints: ['Doppler = motion through space', 'Cosmological = expansion of space itself'],
        examinerNotes: 'Distinction between motion through space vs stretching of space.',
      },
    ],
  },
];

export const PAPER_4_QUESTIONS: Paper4Question[] = [
  ...INITIAL_PAPER_4_QUESTIONS,
  ...PAPER_4_QUESTIONS_PART2,
];
