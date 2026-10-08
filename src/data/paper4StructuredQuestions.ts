export interface QuestionPart {
  partId: string;
  questionText: string;
  marks: number;
  markScheme: string;
  modelAnswer: string;
  keyPoints: string[];
  examinerNotes: string;
  calculatedAnswer?: {
    value: string;
    unit: string;
    tolerance: number; // e.g. 5%
    sf: number; // significant figures required
  };
}

export interface Paper4Question {
  id: string;
  topic: string;
  title: string;
  totalMarks: number;
  context: string;
  diagramSvg?: string;
  parts: QuestionPart[];
}

export const PAPER_4_QUESTIONS: Paper4Question[] = [
  // Question 1: Gravitational Fields & Circular Orbits
  {
    id: 'p4_q1_gravitation',
    topic: 'Gravitational Fields',
    title: 'Gravitational Fields and Binary Star Orbit',
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
          'The gravitational force of attraction between planet and satellite provides the necessary centripetal force for circular motion:\n(G M m) / r² = (m v²) / r\nDividing both sides by m and multiplying by r:\nv² = (G M) / r\nTaking the square root:\nv = √(G M / r)',
        keyPoints: ['GMm/r² = mv²/r', 'centripetal force provided by gravitational force'],
        examinerNotes:
          "Must show equating gravitational force formula to centripetal force formula with mass m explicitly cancelling.",
      },
      {
        partId: '(b)(ii)',
        questionText:
          'Show that the total energy E of the orbiting satellite is given by E = -GMm / (2r).',
        marks: 2,
        markScheme:
          'Kinetic energy Ek = 1/2 m v² = GMm / (2r) [C1]\nPotential energy Ep = -GMm / r [C1]\nTotal energy E = Ek + Ep = GMm / (2r) - GMm / r = -GMm / (2r) [A1].',
        modelAnswer:
          'Kinetic energy of the satellite is:\nEk = 1/2 m v² = 1/2 m (G M / r) = + (G M m) / (2r)\nGravitational potential energy is:\nEp = m Vg = - (G M m) / r\nTotal mechanical energy is the sum of Ek and Ep:\nE = Ek + Ep = (G M m) / (2r) - (G M m) / r = - (G M m) / (2r)',
        keyPoints: ['Ek = GMm/(2r)', 'Ep = -GMm/r', 'E = Ek + Ep = -GMm/(2r)'],
        examinerNotes:
          "State clearly that potential energy is negative. A common error is writing Ep as positive and obtaining 3GMm/(2r).",
      },
      {
        partId: '(c)',
        questionText:
          'The planet has mass M = 6.42 × 10²³ kg and radius R = 3.39 × 10⁶ m. Calculate the minimum speed (escape speed) required for a probe on the surface of the planet to escape completely from its gravitational field to infinity. (G = 6.67 × 10⁻¹¹ N m² kg⁻²)',
        marks: 3,
        markScheme:
          'Conservation of energy: 1/2 m v_esc² - GMm / R = 0 [C1]\nv_esc = √(2GM / R) [C1]\n= √[(2 × 6.67 × 10⁻¹¹ × 6.42 × 10²³) / (3.39 × 10⁶)] = 5.03 × 10³ m s⁻¹ (5.0 km s⁻¹) [A1].',
        modelAnswer:
          'To escape to infinity, the total mechanical energy at the planet surface must equal zero (where both Ek and Ep approach 0 at infinity):\n1/2 m v_esc² - (G M m) / R = 0\n1/2 v_esc² = (G M) / R\nv_esc = √(2 G M / R)\nv_esc = √[(2 × 6.67 × 10⁻¹¹ × 6.42 × 10²³) / (3.39 × 10⁶)]\nv_esc = √(2.526 × 10⁷) = 5.03 × 10³ m s⁻¹ (to 3 significant figures).',
        keyPoints: ['1/2 mv² = GMm/R', 'v = √(2GM/R)', '5.03 × 10³ m s⁻¹'],
        examinerNotes:
          "Check significant figures! Raw data is given to 3 s.f. (6.42, 3.39, 6.67), so 5030 m s⁻¹ or 5.03 × 10³ m s⁻¹ is accepted. Giving 1 s.f. (5000) or 5 s.f. loses the accuracy mark.",
        calculatedAnswer: {
          value: '5.03e3',
          unit: 'm s⁻¹',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // Question 2: Simple Harmonic Motion
  {
    id: 'p4_q2_shm',
    topic: 'Oscillations & SHM',
    title: 'Simple Harmonic Motion of Piston in Cylinder',
    totalMarks: 8,
    context:
      'A piston of mass 0.250 kg in an engine undergoes simple harmonic motion. The displacement x of the piston at time t is represented by x = x₀ cos(ωt), where x₀ = 4.50 × 10⁻² m and frequency f = 25.0 Hz.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'State the defining condition for an oscillation to be simple harmonic.',
        marks: 2,
        markScheme:
          'Acceleration is directly proportional to displacement [B1] and is directed towards a fixed point / in the opposite direction to displacement [B1].',
        modelAnswer:
          'The acceleration is directly proportional to the displacement from a fixed reference point, and the acceleration is always directed towards that fixed point.',
        keyPoints: [
          'acceleration directly proportional to displacement',
          'directed towards a fixed point / opposite direction',
        ],
        examinerNotes:
          "Candidates must not say 'velocity is proportional to displacement'. Must be 'acceleration' and 'displacement'.",
      },
      {
        partId: '(b)(i)',
        questionText:
          'Calculate the maximum acceleration a_max of the piston.',
        marks: 2,
        markScheme:
          'ω = 2πf = 2π × 25.0 = 157.1 rad s⁻¹ [C1]\na_max = ω² x₀ = (157.1)² × (4.50 × 10⁻²) = 1.11 × 10³ m s⁻² [A1].',
        modelAnswer:
          'Angular frequency ω = 2πf = 2 × π × 25.0 = 157.08 rad s⁻¹\nMaximum acceleration occurs at maximum displacement x = x₀:\na_max = ω² x₀\na_max = (157.08)² × (4.50 × 10⁻²)\na_max = 24674 × 0.0450 = 1.11 × 10³ m s⁻² (or 1110 m s⁻²).',
        keyPoints: ['ω = 2πf', 'a_max = ω² x₀', '1.11 × 10³ m s⁻²'],
        examinerNotes:
          "Ensure unit is m s⁻². Do not write negative sign for magnitude of maximum acceleration.",
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
          'Maximum velocity v_max = ω x₀ = 157.08 × 0.0450 = 7.069 m s⁻¹\nMaximum kinetic energy E_k(max) = 1/2 m v_max²\nE_k(max) = 1/2 × 0.250 × (7.069)² = 6.25 J.',
        keyPoints: ['v_max = ω x₀', 'Ek = 1/2 m v_max²', '6.25 J'],
        examinerNotes:
          "Alternatively use E_k = 1/2 m ω² x₀² = 0.5 × 0.250 × (157.08)² × (0.0450)² = 6.25 J.",
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
          'State and explain the effect on the maximum kinetic energy if heavy damping is introduced while maintaining the amplitude at 4.50 × 10⁻² m with an external driver at resonance.',
        marks: 2,
        markScheme:
          'Peak of resonance curve flattens / shifts to slightly lower frequency [B1]\nAt the same amplitude and frequency, maximum velocity and thus maximum Ek would be unchanged [B1] (or more power must be supplied by the external driver to compensate for dissipated thermal energy).',
        modelAnswer:
          'Because maximum kinetic energy depends only on mass, frequency, and amplitude (Ek = 1/2 m ω² x₀²), if the amplitude and frequency are kept constant, the maximum kinetic energy remains 6.25 J. However, the driver must input energy at a much higher rate to balance the rate of energy dissipation due to damping.',
        keyPoints: ['Ek depends on 1/2 m ω² x₀²', 'rate of work done by driver increases to replace lost thermal energy'],
        examinerNotes:
          "Be careful to distinguish between free oscillations (where damping reduces amplitude and energy) and driven oscillations at constant amplitude.",
      },
    ],
  },

  // Question 3: Capacitance & Exponential Discharge
  {
    id: 'p4_q3_capacitance',
    topic: 'Capacitance',
    title: 'Capacitor Discharging Through Resistor',
    totalMarks: 9,
    context:
      'A capacitor of capacitance C = 470 μF is charged to a potential difference V₀ = 12.0 V and then discharged through a resistor of resistance R = 150 kΩ.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Define capacitance.',
        marks: 1,
        markScheme:
          'Charge stored per unit potential difference [B1] (or ratio of charge on one plate to potential difference across plates).',
        modelAnswer:
          'Charge stored on one plate per unit potential difference between the plates (C = Q/V).',
        keyPoints: ['charge per unit potential difference', 'Q/V'],
        examinerNotes:
          "Never write 'storage capacity of electric charge'. Must be 'charge per unit potential difference'.",
      },
      {
        partId: '(b)(i)',
        questionText:
          'Calculate the time constant τ of the discharging circuit.',
        marks: 2,
        markScheme:
          'τ = RC = (150 × 10³ Ω) × (470 × 10⁻⁶ F) [C1]\n= 70.5 s [A1].',
        modelAnswer:
          'Time constant τ = R × C\nτ = (150 × 10³ Ω) × (470 × 10⁻⁶ F)\nτ = 70.5 s.',
        keyPoints: ['τ = RC', '70.5 s'],
        examinerNotes:
          "Convert μF to F (× 10⁻⁶) and kΩ to Ω (× 10³).",
        calculatedAnswer: {
          value: '70.5',
          unit: 's',
          tolerance: 0.01,
          sf: 3,
        },
      },
      {
        partId: '(b)(ii)',
        questionText:
          'Calculate the time t taken for the potential difference across the capacitor to decrease from 12.0 V to 3.00 V.',
        marks: 3,
        markScheme:
          'Discharge equation: V = V₀ e^(-t / RC) [C1]\n3.00 = 12.0 e^(-t / 70.5) => e^(-t / 70.5) = 0.250 [C1]\n-t / 70.5 = ln(0.250) = -1.386 => t = 70.5 × 1.386 = 97.7 s (or 98 s) [A1].',
        modelAnswer:
          'Using the exponential decay equation for voltage:\nV = V₀ e^(-t / τ)\n3.00 = 12.0 e^(-t / 70.5)\n3.00 / 12.0 = e^(-t / 70.5)\n0.250 = e^(-t / 70.5)\nTaking natural logarithm of both sides:\nln(0.250) = -t / 70.5\n-1.3863 = -t / 70.5\nt = 1.3863 × 70.5 = 97.7 s (to 3 significant figures).',
        keyPoints: ['V = V₀ e^(-t/RC)', 'ln(V/V₀) = -t/RC', '97.7 s'],
        examinerNotes:
          "Alternative method using half-life: 12V -> 6V -> 3V is two half-lives. t_half = τ ln(2) = 70.5 × 0.693 = 48.87 s. t = 2 × 48.87 = 97.7 s.",
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
          'Calculate the energy dissipated in the resistor as the potential difference decreases from 12.0 V to 3.00 V.',
        marks: 3,
        markScheme:
          'Initial energy E₁ = 1/2 C V₁² = 1/2 × (470 × 10⁻⁶) × (12.0)² = 3.384 × 10⁻² J [C1]\nFinal energy E₂ = 1/2 C V₂² = 1/2 × (470 × 10⁻⁶) × (3.00)² = 2.115 × 10⁻³ J [C1]\nEnergy dissipated ΔE = E₁ - E₂ = 3.384 × 10⁻² - 0.2115 × 10⁻² = 3.17 × 10⁻² J [A1].',
        modelAnswer:
          'Energy stored in a capacitor is given by E = 1/2 C V².\nInitial stored energy:\nE₁ = 1/2 × (470 × 10⁻⁶ F) × (12.0 V)² = 0.03384 J\nFinal stored energy at 3.00 V:\nE₂ = 1/2 × (470 × 10⁻⁶ F) × (3.00 V)² = 0.002115 J\nEnergy dissipated as thermal energy in the resistor:\nΔE = E₁ - E₂ = 0.03384 - 0.002115 = 0.0317 J = 3.17 × 10⁻² J (31.7 mJ).',
        keyPoints: ['E = 1/2 CV²', 'ΔE = 1/2 C (V₁² - V₂²)', '3.17 × 10⁻² J'],
        examinerNotes:
          "Do NOT calculate 1/2 C (V₁ - V₂)²! That is mathematically incorrect because (12 - 3)² = 81 ≠ 12² - 3² = 135.",
        calculatedAnswer: {
          value: '3.17e-2',
          unit: 'J',
          tolerance: 0.02,
          sf: 3,
        },
      },
    ],
  },

  // Question 4: Electromagnetic Induction & Faraday's Law
  {
    id: 'p4_q4_induction',
    topic: 'Electromagnetic Induction',
    title: 'Coil Rotating in Uniform Magnetic Field',
    totalMarks: 9,
    context:
      'A flat circular coil of N = 250 turns and cross-sectional area A = 4.20 × 10⁻³ m² rotates at a constant angular speed ω in a uniform magnetic field of flux density B = 0.160 T.',
    parts: [
      {
        partId: '(a)',
        questionText:
          "State Faraday's law of electromagnetic induction.",
        marks: 1,
        markScheme:
          'The magnitude of induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage [B1].',
        modelAnswer:
          'The magnitude of the induced electromotive force (e.m.f.) is directly proportional to the rate of change of magnetic flux linkage.',
        keyPoints: ['induced e.m.f.', 'rate of change of magnetic flux linkage'],
        examinerNotes:
          "Must state 'magnetic flux linkage' (or rate of change of magnetic flux if for a single loop).",
      },
      {
        partId: '(b)',
        questionText:
          'Explain why the induced e.m.f. is alternating when the coil rotates at constant angular speed in the uniform magnetic field.',
        marks: 3,
        markScheme:
          'Flux linkage is given by Φ_link = BAN cos(ωt) [B1]\nRate of change of flux linkage varies sinusoidally / direction of change of flux reverses every half turn [B1]\nBy Faraday and Lenz laws, e.m.f. changes direction whenever the flux reaches maximum or minimum (e.m.f. = -d(NΦ)/dt = BANω sin(ωt)) [B1].',
        modelAnswer:
          'As the coil rotates, the magnetic flux through the coil varies sinusoidally with time: Φ = BA cos(ωt). The rate of change of magnetic flux linkage (d(NΦ)/dt) is maximum when the plane of the coil is parallel to the field, and zero when perpendicular. The direction in which the flux cuts across the coil reverses every half rotation (180°), causing the direction of the induced e.m.f. to reverse alternately every half cycle.',
        keyPoints: [
          'sinusoidal variation of flux linkage with time',
          'rate of change of flux linkage reverses sign every half cycle',
          'e.m.f. alternates between positive and negative',
        ],
        examinerNotes:
          "Clear explanation linking rate of change of flux to sign reversal of induced e.m.f. is required.",
      },
      {
        partId: '(c)',
        questionText:
          'The peak induced e.m.f. generated across the coil is E₀ = 8.50 V. Calculate the frequency f of rotation of the coil.',
        marks: 3,
        markScheme:
          'E₀ = BANω = BAN(2πf) [C1]\n8.50 = 0.160 × (4.20 × 10⁻³) × 250 × (2πf) = 1.0556 × f [C1]\nf = 8.50 / 1.0556 = 8.05 Hz [A1].',
        modelAnswer:
          'Peak induced e.m.f. occurs when sin(ωt) = 1:\nE₀ = B × A × N × ω\nSince ω = 2πf:\nE₀ = B A N (2 π f)\n8.50 = (0.160 T) × (4.20 × 10⁻³ m²) × 250 × (2 × π × f)\n8.50 = 0.168 × (2π) × f = 1.0556 × f\nf = 8.50 / 1.0556 = 8.05 Hz (to 3 significant figures).',
        keyPoints: ['E₀ = BANω', 'ω = 2πf', '8.05 Hz'],
        examinerNotes:
          "Carefully evaluate BAN: 0.160 × 4.20e-3 × 250 = 0.168 Wb-turns. 0.168 × 2π = 1.0556. f = 8.05 Hz.",
        calculatedAnswer: {
          value: '8.05',
          unit: 'Hz',
          tolerance: 0.02,
          sf: 3,
        },
      },
      {
        partId: '(d)',
        questionText:
          'A solid copper sheet is made to oscillate between the magnetic poles. Explain why the oscillations are heavily damped, and state how this damping could be reduced.',
        marks: 2,
        markScheme:
          'As copper moves through magnetic field, changing flux induces eddy currents in sheet [B1]\nBy Lenz’s law, eddy currents produce a magnetic force that opposes motion, converting kinetic energy into thermal energy [B1]\nReduction: Cut slots / slits in the copper sheet to interrupt eddy current loops [B1]. (Any 2 for 2 marks).',
        modelAnswer:
          'As the copper sheet swings into and out of the magnetic field, changing magnetic flux induces circulating currents (eddy currents) in the solid copper. By Lenz’s law, these eddy currents experience a magnetic braking force opposing the motion of the sheet, dissipating kinetic energy into thermal energy.\nDamping can be significantly reduced by cutting vertical slots or slits in the sheet (laminating/combing) to interrupt the eddy current loops and increase electrical resistance.',
        keyPoints: ['eddy currents induced', 'Lenz law magnetic force opposes motion', 'cut slits/slots in sheet'],
        examinerNotes:
          "Very common 2-mark question in CIE Paper 4. Must name 'eddy currents' and suggest 'cutting slots/slits'.",
      },
    ],
  },

  // Question 5: Nuclear Physics & Radioactive Decay
  {
    id: 'p4_q5_nuclear',
    topic: 'Nuclear Physics',
    title: 'Radioactive Decay of Actinium-225',
    totalMarks: 8,
    context:
      'Actinium-225 (²²⁵₈₉Ac) is an alpha-emitter with a half-life of 9.92 days. It decays into Francium-221 (²²¹₈₇Fr). A sample initially contains 1.80 × 10¹⁴ nuclei of Actinium-225.',
    parts: [
      {
        partId: '(a)',
        questionText:
          'Define radioactive decay constant λ.',
        marks: 1,
        markScheme:
          'Probability per unit time [B1] of decay of a nucleus.',
        modelAnswer:
          'The probability per unit time of the decay of a given nucleus.',
        keyPoints: ['probability per unit time', 'decay of a nucleus'],
        examinerNotes:
          "Never write 'rate of decay'. Rate of decay is Activity (A). Decay constant is probability per unit time.",
      },
      {
        partId: '(b)',
        questionText:
          'Calculate the initial activity A₀ of the sample in Becquerels (Bq).',
        marks: 3,
        markScheme:
          'Convert t_1/2 to seconds: 9.92 × 24 × 3600 = 8.571 × 10⁵ s [C1]\nλ = ln(2) / t_1/2 = 0.69315 / (8.571 × 10⁵) = 8.087 × 10⁻⁷ s⁻¹ [C1]\nA₀ = λN₀ = (8.087 × 10⁻⁷) × (1.80 × 10¹⁴) = 1.46 × 10⁸ Bq [A1].',
        modelAnswer:
          'Half-life in seconds:\nt_1/2 = 9.92 × 24 × 3600 s = 8.5709 × 10⁵ s\nDecay constant λ:\nλ = ln(2) / t_1/2 = 0.69315 / (8.5709 × 10⁵ s) = 8.0872 × 10⁻⁷ s⁻¹\nInitial Activity A₀ = λ N₀:\nA₀ = (8.0872 × 10⁻⁷ s⁻¹) × (1.80 × 10¹⁴)\nA₀ = 1.46 × 10⁸ Bq (or 1.46 × 10⁸ s⁻¹).',
        keyPoints: ['t_1/2 in seconds', 'λ = ln(2)/t_1/2', 'A = λN', '1.46 × 10⁸ Bq'],
        examinerNotes:
          "The most common mistake is forgetting to convert days into seconds! 1 Bq = 1 decay per second.",
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
          'Calculate the time t in days required for the number of Actinium-225 nuclei to decrease to 2.50 × 10¹³.',
        marks: 2,
        markScheme:
          'N = N₀ e^(-λt) => 2.50 × 10¹³ = 1.80 × 10¹⁴ e^(-λt) [C1]\nln(2.50 / 18.0) = -1.974\nt = 1.974 / λ or using t = t_1/2 × [ln(N₀/N) / ln(2)] = 9.92 × [ln(7.20) / ln(2)] = 28.3 days [A1].',
        modelAnswer:
          'Using radioactive decay law N = N₀ e^(-λt) or N/N₀ = (1/2)^(t / t_1/2):\nN / N₀ = (2.50 × 10¹³) / (1.80 × 10¹⁴) = 0.13889\nTaking natural log:\nln(N / N₀) = -λ t\nln(0.13889) = -1.9741\nSince λ = ln(2) / t_1/2:\nt = -ln(N / N₀) × (t_1/2 / ln(2))\nt = 1.9741 × (9.92 days / 0.69315)\nt = 28.25 days = 28.3 days.',
        keyPoints: ['N = N₀ e^(-λt)', '28.3 days'],
        examinerNotes:
          "Can work directly in days when calculating time in days, avoiding intermediate conversion errors.",
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
          'State why the actual activity measured by a detector placed near the sample after 28 days is higher than the activity calculated purely from Actinium-225 decays.',
        marks: 2,
        markScheme:
          'The daughter nucleus (Francium-221) is also radioactive / unstable [B1]\nDecay of daughter nuclei also emits radiation, contributing to the total measured activity [B1].',
        modelAnswer:
          'The daughter product, Francium-221, is itself radioactive and decays further into other radioactive nuclides in a decay chain. These daughter nuclides emit their own radiation (alphas, betas, gammas), which are detected by the detector in addition to the decays of Actinium-225.',
        keyPoints: ['daughter nucleus is radioactive', 'decay chain emits additional radiation'],
        examinerNotes:
          "Examiners reward awareness of decay chains where daughter nuclei contribute to measured count rate.",
      },
    ],
  },
];
