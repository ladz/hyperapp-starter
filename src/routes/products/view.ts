import type { VNode } from "hyperapp";
import { div, h1, h3, p, span, text } from "@hyperapp/html";
import type { AppState } from "../../app.js";

const ProductCard = (
	name: string,
	price: string,
	description: string,
	category: string,
): VNode<AppState> =>
	div(
		{
			style: {
				marginBottom: "1.5rem",
				padding: "1rem",
				background: "#f5f5f5",
				borderRadius: "4px",
			},
		},
		[
			div(
				{
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "start",
						marginBottom: "0.5rem",
					},
				},
				[
					h3({ style: { margin: "0" } }, text(name)),
					span(
						{
							style: {
								fontWeight: "bold",
								color: "#0066cc",
								fontSize: "1.1em",
							},
						},
						text(price),
					),
				],
			),
			p(
				{ style: { color: "#888", fontSize: "0.85em", margin: "0.25rem 0" } },
				text(category),
			),
			p({ style: { margin: "0.5rem 0 0 0" } }, text(description)),
		],
	);

export const ProductsView = (): VNode<AppState> => {
	const products = [
    {
      name: "Premium Tastatur MX-500",
      price: "€129,99",
      category: "Hardware",
      description:
        "Mechanische Tastatur mit RGB-Beleuchtung, Cherry MX Blue Switches und Handballenauflage.",
    },
    {
      name: "Ergonomische Maus ProGrip",
      price: "€79,99",
      category: "Hardware",
      description:
        "Vertikale Maus zur Reduktion von Handgelenkbelastung, 6 programmierbare Tasten.",
    },
    {
      name: '4K Monitor 32" UltraSharp',
      price: "€649,99",
      category: "Hardware",
      description:
        "IPS-Panel, 3840x2160 Auflösung, 99% sRGB, höhenverstellbar, USB-C Anschluss.",
    },
    {
      name: "Noise-Cancelling Kopfhörer NC-700",
      price: "€299,99",
      category: "Audio",
      description:
        "Over-Ear Kopfhörer mit aktiver Geräuschunterdrückung, 30 Stunden Akkulaufzeit.",
    },
    {
      name: "Webcam HD Pro 1080p",
      price: "€89,99",
      category: "Video",
      description:
        "Full HD Webcam mit Autofokus, Dual-Mikrofon und Ringlicht für professionelle Videokonferenzen.",
    },
    {
      name: "USB-C Dock Station",
      price: "€199,99",
      category: "Zubehör",
      description:
        "12-in-1 Docking Station mit HDMI, DisplayPort, Ethernet, USB-A und SD-Kartenleser.",
    },
    {
      name: "Laptop-Ständer Aluminium",
      price: "€49,99",
      category: "Zubehör",
      description:
        "Höhenverstellbarer Laptop-Ständer aus Aluminium, verbessert Ergonomie und Luftzirkulation.",
    },
    {
      name: "Externe SSD 2TB Velocity",
      price: "€189,99",
      category: "Speicher",
      description:
        "NVMe SSD mit bis zu 2000 MB/s Lesegeschwindigkeit, USB 3.2 Gen 2, IP65 wasserdicht.",
    },
    {
      name: "Wireless Charger Qi Fast",
      price: "€34,99",
      category: "Zubehör",
      description:
        "15W kabelloses Ladegerät, kompatibel mit allen Qi-fähigen Geräten.",
    },
    {
      name: "LED Schreibtischlampe Smart",
      price: "€69,99",
      category: "Beleuchtung",
      description:
        "Dimmbare LED-Lampe mit Farbtemperatureinstellung, USB-Ladeanschluss, Touch-Bedienung.",
    },
    {
      name: "Bluetooth Lautsprecher Portable+",
      price: "€119,99",
      category: "Audio",
      description:
        "360° Sound, 20 Stunden Akku, IPX7 wasserdicht, ideal für unterwegs.",
    },
    {
      name: "Gaming Stuhl Ergo Pro",
      price: "€399,99",
      category: "Möbel",
      description:
        "Ergonomischer Gaming-Stuhl mit Lordosenstütze, 4D-Armlehnen und atmungsaktivem Mesh.",
    },
    {
      name: "Grafiktablet DrawMaster",
      price: "€249,99",
      category: "Kreativ",
      description:
        "8192 Druckstufen, batterieloser Stift, 10x6 Zoll Arbeitsfläche für digitale Kunst.",
    },
    {
      name: "Mikrofonarm mit Filter",
      price: "€59,99",
      category: "Audio",
      description:
        "Flexibler Mikrofonarm mit Pop-Filter und Spinne, bis 2kg Traglast.",
    },
    {
      name: "USB-Hub 7-Port",
      price: "€24,99",
      category: "Zubehör",
      description:
        "Aktiver USB 3.0 Hub mit individuellen Schaltern und LED-Anzeige.",
    },
    {
      name: "Kabelmanagement-Set Premium",
      price: "€19,99",
      category: "Zubehör",
      description:
        "Komplettset mit Kabelkanal, Clips und Kabelbindern für einen aufgeräumten Schreibtisch.",
    },
    {
      name: "Monitor Lichtleiste ScreenGlow",
      price: "€79,99",
      category: "Beleuchtung",
      description:
        "Reduziert Augenbelastung durch indirektes Licht, dimmbar, keine Bildschirmreflexionen.",
    },
    {
      name: "Mechanische Numpad RGB",
      price: "€44,99",
      category: "Hardware",
      description:
        "Separater Nummernblock mit mechanischen Schaltern, ideal für Finanzarbeiten.",
    },
    {
      name: 'Laptop-Tasche Waterproof 15"',
      price: "€54,99",
      category: "Zubehör",
      description:
        "Wasserabweisende Laptoptasche mit extra Fächern für Zubehör.",
    },
    {
      name: "Webcam Abdeckung Set",
      price: "€9,99",
      category: "Sicherheit",
      description: "6er Pack ultra-dünne Webcam-Abdeckungen für Privatsphäre.",
    },
    {
      name: "Streaming Mikrofon USB Pro",
      price: "€159,99",
      category: "Audio",
      description:
        "Kondensatormikrofon mit Nierencharakteristik, Gain-Regler und Mute-Taste.",
    },
    {
      name: "Monitor Halterung Dual",
      price: "€89,99",
      category: "Zubehör",
      description:
        'Tischhalterung für zwei Monitore bis 32", neig- und schwenkbar, VESA-kompatibel.',
    },
    {
      name: "Smart Plug WLAN 4er Pack",
      price: "€39,99",
      category: "Smart Home",
      description:
        "Intelligente Steckdosen mit App-Steuerung und Zeitschaltung.",
    },
    {
      name: "Presenter mit Laserpointer",
      price: "€29,99",
      category: "Präsentation",
      description:
        "Wireless Presenter mit grünem Laserpointer, bis 100m Reichweite.",
    },
  ];

	return div({}, [
		h1({}, text("Produkte")),
		p(
			{ style: { marginBottom: "2rem" } },
			text("Unser Sortiment an Hardware und Zubehör für produktives Arbeiten."),
		),
		div(
			{},
			products.map((p) => ProductCard(p.name, p.price, p.description, p.category)),
		),
	]);
};
