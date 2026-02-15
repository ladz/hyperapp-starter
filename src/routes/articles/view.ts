import { h, text, type VNode } from "hyperapp";
import type { AppState } from "../../app.js";

const ArticleCard = (
  title: string,
  date: string,
  content: string,
): VNode<AppState> =>
  h(
    "article",
    {
      style: {
        marginBottom: "2rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
      },
    },
    [
      h("h2", {}, text(title)),
      h("p", { style: { color: "#666", fontSize: "0.9em" } }, text(date)),
      h("p", {}, text(content)),
    ],
  );

export const ArticlesView = (): VNode<AppState> => {
  const articles = [
    {
      title: "Die Zukunft der Frontend-Entwicklung",
      date: "15. Februar 2026",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      title: "Hyperapp: Minimalistisch und mächtig",
      date: "14. Februar 2026",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    },
    {
      title: "TypeScript Best Practices für 2026",
      date: "13. Februar 2026",
      content:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    },
    {
      title: "Funktionale Programmierung im Browser",
      date: "12. Februar 2026",
      content:
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
    },
    {
      title: "Zod Schema Validation: Ein praktischer Guide",
      date: "11. Februar 2026",
      content:
        "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Hanc ego cum teneam sententiam, quid est cur verear ne ad eam non possim accommodare Torquatos nostros? Quos tu paulo ante cum memoriter, tum etiam erga nos amice et benivole collegisti.",
    },
    {
      title: "State Management ohne Redux",
      date: "10. Februar 2026",
      content:
        "Nec me miserum consule designato, quo omnes scelerati cives ad arma vocandi sint, sed illo patre tuo, qui exercitum contra rem publicam duxit et se in eas partes contulit, quae tum erant contra patriam. Quamquam, si plane sic verterem Platonem aut Aristotelem, ut verterunt nostri poetae fabulas, male, credo, mererer de meis civibus.",
    },
    {
      title: "Routing in Single Page Applications",
      date: "9. Februar 2026",
      content:
        "Philosophi autem in suis lectulis plerumque moriuntur. Senectus enim quamvis non sit gravis, tamen aufert eam firmitatem, qua etiam in iuventute carebant ii, quos ad excipiendos tribunos militares non suis, sed alienis gladiis uti necesse erat. Quod si in aliqua re peccarim, deliquerimve, nolite id cum ista gratia vestra communicare.",
    },
    {
      title: "Vite vs. Webpack: Ein Vergleich",
      date: "8. Februar 2026",
      content:
        "Quamquam id quidem infinitum est in hac urbe; quantum enim operae consumitur in diebus festis, quantum in triumphis! Sed haec hactenus. Nunc de sententia mea dicam et quod sentio, vobis exponam. Nam cum omnibus virtutibus omnia vitia contraria sunt et cum virtus possit intellegi ex eo vitio, cui est contraria.",
    },
    {
      title: "Vitest: Modernes Testing für Vite",
      date: "7. Februar 2026",
      content:
        "Quo tandem animo tibi ferendum putas, cum respexeris ad hanc diem vel potius ad hanc noctem, cum ille hac urbe esse desiit? Non enim iam in speluncam ad socios tuos confugies; non cum illis cotidianis consiliis pravoque illo conventiculo paene iam omnem rem publicam delevistis. Itaque ne id quidem sperare debemus.",
    },
    {
      title: "Ramda.js: Funktionale Utilities",
      date: "6. Februar 2026",
      content:
        "Nihil est enim illi tam contrarium quam humanitati, aequitati, modestiae. Quamquam haec quidem praeceptis philosophorum assequi possumus; sed tamen est quaedam ingenita in mentibus nostris insatiabilis quaedam cupiditas veri videndi. Itaque ut summum bonum hoc sit, quod illi dicunt, sentire se suaviter.",
    },
    {
      title: "API Design: REST vs. GraphQL",
      date: "5. Februar 2026",
      content:
        "Sed ad haec, nisi molestum est, habeo quae velim. An me, inquam, nisi te audire vellem, censes haec dicturum fuisse? Quamquam scripsit artem rhetoricam Aristoteles itemque Theophrastus, optimi illi quidem auctores, sed neque ii voluerunt earn artem a philosophia separare, et nos in Academicis et in Tusculanis et in ceteris libris philosophiam nostram nobis ipsi tradidimus.",
    },
    {
      title: "Performance-Optimierung im Frontend",
      date: "4. Februar 2026",
      content:
        "Ego autem arbitror, quamquam est subtilius aliquid in rebus ipsis et in natura reconditum, tamen id esse eiusmodi, ut, nisi a perdoctis neque id ipsum a multis intelligatur. Sed hoc interesse inter Epicurum et Metrodorum puto, quod, cum uterque poneret ita summum bonum, ut ne desideraret quidem sapiens ullam voluptatem.",
    },
    {
      title: "CSS-in-JS oder klassisches CSS?",
      date: "3. Februar 2026",
      content:
        "Quod idem Xenocrates, eximius in primis Platonis auditor, fecisse dicitur. Atque ille quidem, qui eo die tanto honore a senatu populoque Romano affectus est, erat dignus profecto qui in re publica floreret, sed tamen in navi, cum fugeret, inventus est. Omitto autem cetera: nunc de te ipso, quod mihi maxime facile est, dicam.",
    },
    {
      title: "Web Components: Der Standard von morgen?",
      date: "2. Februar 2026",
      content:
        "Sed quoniam et advesperascit et isti molesti esse non vultis, habeo commissum a Labeone, ut, quoniam iudiciis fores non solebat obserare, nunc in hospitium deductum domum meam custodiat. Sic enim censeo, patres conscripti, sicuti Silanus verba fecit, eos, qui haec delere conati sunt, morte esse multandos.",
    },
    {
      title: "Accessibility: Warum es wichtig ist",
      date: "1. Februar 2026",
      content:
        "Atque haec ita iustitiae propria sunt, ut sint virtutum reliquarum communia. Nam et temperantia et fortitudo, quarum una est firma et stabilis possessio rationis in rebus expetendis et fugiendis, altera autem rerum expetendarum et fugendarum obedientia rationi constant, cum ab appetitu discedunt.",
    },
  ];

  return h("div", {}, [
    h("h1", {}, text("Artikel")),
    h(
      "p",
      { style: { marginBottom: "2rem" } },
      text("Eine Sammlung von Artikeln über moderne Web-Entwicklung."),
    ),
    h(
      "div",
      {},
      articles.map((a) => ArticleCard(a.title, a.date, a.content)),
    ),
  ]);
};
