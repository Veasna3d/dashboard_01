/*----DisplayData Funtion----*/

function PrintReport(){
	$("#div_print").printThis({
		debug: false,
		importCSS: true,
		importStyle: true,
		printContainer: true,
		loadCSS: ["../POS_System/assets/css/bootstrap.min.css"],
		pageTitle: "",
		removeInline: false,
		removeInlineSelector: "*",
		printDelay: 333,
		header: null,
		footer: null,
		base: false,
		formValues: true,
		canvas: false,
		doctypeString: '....',
		removeScripts: false,
		copyTagClasses: false,
		beforePrintEvent: null,
		beforePrint: null,
		afterPrint: null
	});
}