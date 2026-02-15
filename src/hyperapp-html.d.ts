declare module "@hyperapp/html" {
	import type { VNode } from "hyperapp";

	type Props = Record<string, any>;
	type Children = VNode<any> | VNode<any>[] | string | null | undefined;

	export function a(props: Props, children?: Children): VNode<any>;
	export function article(props: Props, children?: Children): VNode<any>;
	export function div(props: Props, children?: Children): VNode<any>;
	export function h1(props: Props, children?: Children): VNode<any>;
	export function h2(props: Props, children?: Children): VNode<any>;
	export function h3(props: Props, children?: Children): VNode<any>;
	export function li(props: Props, children?: Children): VNode<any>;
	export function main(props: Props, children?: Children): VNode<any>;
	export function nav(props: Props, children?: Children): VNode<any>;
	export function p(props: Props, children?: Children): VNode<any>;
	export function span(props: Props, children?: Children): VNode<any>;
	export function strong(props: Props, children?: Children): VNode<any>;
	export function ul(props: Props, children?: Children): VNode<any>;
	export function text(value: string | number): VNode<any>;
}
