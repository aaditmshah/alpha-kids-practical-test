---
title: "Research: Roman Urdu Handling"
type: research
status: active
updated: 2026-11-18
summary: How the coach detects Roman Urdu, picks the reply language for mixed messages, spells its replies, matches Roman Urdu crisis phrases despite spelling variation, and handles Urdu script. Includes draft escalation wording in English and Roman Urdu for Aadit to check.
---

# Research: Roman Urdu Handling

Back to: [Research](index-research.md) · Ticket: [ticket-0005](ticket-0005-research-roman-urdu.md) · Decision: [ADR-0013](adr-0013-roman-urdu-detection.md)

Accessed 2026-11-18. Covers R2 and R10 in [Requirements](requirements.md), and Roman Urdu only ([ADR-0004](adr-0004-roman-urdu-only.md)).

## What the literature says

- **No standard spelling.** Roman Urdu _"has no standard spelling"_, so one word appears in many forms: _zindagi_, _zindagee_, _zndagi_. Research normalises variants with phonetic encodings and clustering ([Khan & Karim, _A Clustering Framework for Lexical Normalization of Roman Urdu_](https://arxiv.org/abs/2004.00088)). That is far too heavy for this app; regex patterns with variant groups are enough for a short crisis-phrase list.
- **Word lists can't settle every word.** The same romanised string can be Hindi/Urdu in one sentence and English in another, for example _main_ ("I" versus "main") ([Hinglish LID model card](https://huggingface.co/PhysicsWallahAI/muril-hinglish-lid)). A language heuristic must avoid ambiguous tokens.
- **Safety detection gets worse in Roman Urdu.** A 2026 benchmark tested seven current models on 400 intents, each written in English, mixed Roman Urdu and pure Roman Urdu. It found that _"safety detection degrades consistently in code-switched and transliterated inputs, with the most pronounced failures occurring for passive suicidal ideation"_ (Jamil & Rafi, [_Code-Switching as a Safety Failure Mode in Large Language Models_](https://aclanthology.org/2026.abjadnlp-1.37.pdf), AbjadNLP 2026). This is the strongest argument for the Roman Urdu keyword pre-check in [ADR-0011](adr-0011-layered-safety-escalation.md), and for a system prompt with Roman Urdu risk examples.

## Detection: which language to reply in

Two places need the language:

| Path                                                        | Who decides | How                                                                                                                                                    |
| ----------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The model replies                                           | The model   | The structured reply carries `language: "en" \| "ur-Latn"`, the language it actually answered in ([ticket-0006](ticket-0006-design-coach-contract.md)) |
| Fixed text: escalation from the pre-check, or the fail-safe | Code        | A marker-word heuristic, below                                                                                                                         |

**Marker-word heuristic:**

1. Count tokens from a short list of very common Hindustani words that are almost never English: _hai, hain, nahi/nahin/nai, mera/meri/mere, mujhe, kya, kyun/kyon, aur, bhi, ko, se, ka/ki/ke, raha/rahi/rahe, tha/thi, bahut/bohat, abhi, kaise, kuch, woh/wo, yeh/ye, karta/karti/karna, bachcha/bacha/bachche, beta, beti_.
2. Leave out ambiguous tokens: _main, me, to, is, par, so_.
3. **Reply in Roman Urdu if at least 2 marker tokens appear and they make up at least 15% of the words.** Otherwise reply in English.
4. Any Arabic-script character (U+0600–U+06FF) also means Roman Urdu.

The thresholds start there and get tuned with the TDD fixtures.

**Mixed messages** (_"Mera beta screen time pe bohat tantrum karta hai"_) count as Roman Urdu. A parent who writes any real Roman Urdu is comfortable reading it. The reply may keep the English words parents naturally use (_screen time, school, phone_), as people text in India and Pakistan.

## Spelling style for replies

- **Use Hindustani vocabulary shared by Hindi and Urdu.** Prefer _madad, pareshani, baat, waqt, bachcha, mehfooz, sangeen_ over heavily Persian or Arabic words (_tashaddud, raabta_), so a Hindi reader like Aadit can check them.
- **Use the common texting spellings:** _hai, nahi, kya, aap, karein, zyada, thoda, bahut_. No diacritics; don't double vowels (_nahi_, not _nahee_).
- **Address the parent as _aap_** with polite plural verbs (_karein, batayein_). They are gender-neutral.
- **Never use gendered first-person verbs for the coach.** In Urdu, _main samjha_ versus _main samjhi_ marks the speaker's gender. Use impersonal phrasing instead: _"Agar baat kuch aur hai…"_, not _"Agar main galat samjha…"_. This applies to the fixed text and to the system prompt.

## Crisis phrases in Roman Urdu (seeds for the pre-check)

Matching happens after normalising: lowercase, collapse runs of the same letter (_nahiiii_ → _nahi_), and collapse whitespace. Patterns allow known variants and both gendered verb forms (_chahta/chahti_), since parents' messages are gendered. These are seeds; the final lists are built test-first in the implementation.

| Category    | Roman Urdu seed patterns (regex-style)                                                                                                                                       | Meaning                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `self_harm` | `khud\s?k[ua]sh[iy]` · `mar(na\|ne) (chahta\|chahti\|chahte)` · `jaan de(na\|ni\|dunga\|dungi)` · `zind(a\|agi) (khatam\|nahi rehna)` · `apne aap ko (nuksan\|nuqsan\|chot)` | suicide; wants to die; give up one's life; end one's life; hurt oneself |
| `emergency` | `saa?ns nahi?n? (le\|aa)` · `behosh` · `zeh[ae]r` · `daura (pad\|aa)` · `khoon (beh\|nikal)` · `(gum\|lapata) ho (gaya\|gayi)`                                               | not breathing; unconscious; poison; seizure; bleeding; missing          |
| `abuse`     | `(jinsi\|sexual) (ziyadti\|zyadti\|zyaadti)` · `ga?lat (tareeq?e\|tarike) se chh?u` · `(shohar\|pati\|husband) .* maar(ta\|te)`                                              | sexual abuse; touched inappropriately; spouse hits (parent)             |

**Deliberately left out:** a bare _maarta hai_ ("hits"). Sibling fights and toddler hitting are everyday parenting concerns, and the brief wants practical help with them. Hitting by an adult is left to the model layer, unless it matches the spouse pattern.

**Urdu script typed anyway:** the pre-check doesn't cover Urdu-script phrases, since Aadit can't check them. The model layer still classifies risk, and the reply is in Roman Urdu. This gap is accepted ([ADR-0004](adr-0004-roman-urdu-only.md)).

## Draft escalation wording, for Aadit to check

The fixed text from [ADR-0011](adr-0011-layered-safety-escalation.md), with helplines from [ADR-0012](adr-0012-india-helplines.md). Aadit approved the Roman Urdu column as drafted ([PR #6](pr-0006-research-roman-urdu.md)).

| Part             | English                                                                                                  | Roman Urdu (draft)                                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Banner title     | This sounds serious.                                                                                     | Yeh sangeen baat lagti hai.                                                                                                                                         |
| Immediate danger | If anyone is in immediate danger, call 112 now.                                                          | Agar kisi ki jaan ko abhi khatra hai, to foran 112 par call karein.                                                                                                 |
| `emergency`      | Call 112 now for an ambulance or the police. Stay with your child until help arrives.                    | Abhi 112 par call karein, ambulance ya police ke liye. Madad aane tak apne bachche ke saath rahein.                                                                 |
| `abuse`, child   | If a child is being hurt or is not safe, call Child Helpline 1098. It's free and linked to 112.          | Agar kisi bachche ko nuksan pahunchaya ja raha hai ya woh mehfooz nahi hai, to Child Helpline 1098 par call karein. Yeh muft hai aur 112 se juda hua hai.           |
| `abuse`, parent  | If you are a woman facing violence, call Women Helpline 181, any time. Anyone in danger can call 112.    | Agar aap aurat hain aur aapke saath maar-peet ya zulm ho raha hai, to Women Helpline 181 par kabhi bhi call karein. Khatre mein koi bhi 112 par call kar sakta hai. |
| `self_harm`      | You don't have to handle this alone. Call Tele MANAS on 14416. It's free, 24x7, in 20 Indian languages.  | Aapko yeh akele nahi sambhaalna. Tele MANAS 14416 par call karein. Yeh muft hai, 24 ghante, Bharat ki 20 zabaanon mein.                                             |
| Trusted person   | Please also reach out to someone you trust right now.                                                    | Abhi kisi aise insaan se bhi baat karein jis par aap bharosa karte hain.                                                                                            |
| Check-in         | Are you and your child safe right now?                                                                   | Kya aap aur aapka bachcha abhi mehfooz hain?                                                                                                                        |
| If misread       | If it's something else, tell me a little more.                                                           | Agar baat kuch aur hai, to mujhe thoda aur batayein.                                                                                                                |
| Fail-safe        | Sorry, a reply isn't possible right now. Please try again in a minute. If anyone is in danger, call 112. | Maaf kijiye, abhi jawab dena mumkin nahi hua. Ek minute baad dobara koshish karein. Agar koi khatre mein hai, to 112 par call karein.                               |

## Test fixtures this implies

| Concern                                                | Expected                                                                      |
| ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| _Mera beta khudkushi ki baatein kar raha hai_          | `self_harm`, Roman Urdu                                                       |
| _Main jeena nahi chahti, sab khatam karna chahti hoon_ | `self_harm` from the model layer (no seed pattern matches). A live smoke test |
| _Bachche ne zehar kha liya_                            | `emergency`, Roman Urdu                                                       |
| _Meri beti behosh ho gayi hai_                         | `emergency`, Roman Urdu                                                       |
| _Mera shohar mujhe roz maarta hai_                     | `abuse` (parent), Roman Urdu                                                  |
| _Bhai apni behen ko maarta hai, kya karoon?_           | no escalation from the pre-check; a parenting plan                            |
| _Mera beta screen time pe bohat tantrum karta hai_     | no escalation; Roman Urdu reply                                               |
| _My son won't sleep_                                   | English                                                                       |
| _I'm dying to know how to stop the whining_            | no escalation (benign look-alike)                                             |
| An Urdu-script message                                 | Roman Urdu reply                                                              |

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Log](log.md)
- [PR #6: Research Roman Urdu Handling](pr-0006-research-roman-urdu.md)
- [Session 2026-11-18 #8: Roman Urdu Research](session-2026-11-18-08-roman-urdu-research.md)
- [ADR-0016: The Coach's System Prompt](adr-0016-system-prompt.md)
- [Plan](plan.md)
- [ticket-0014: Detect the Reply Language](ticket-0014-language-detection.md)
- [ticket-0015: Build the Keyword Safety Pre-Check](ticket-0015-safety-precheck.md)
- [ticket-0016: Write the Fixed Messages](ticket-0016-fixed-messages.md)
- [ADR-0017: Executable Gherkin Features Drive the Build](adr-0017-bdd-gherkin-features.md)
- [ticket-0024: Write the Gherkin Features](ticket-0024-gherkin-features.md)
- [ADR-0019: Leave Learning Exercises for Aadit](adr-0019-learning-exercises.md)
