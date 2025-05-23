export default {
	'extends': [
		'stylelint-config-html',
		'stylelint-config-recommended-vue',
		'stylelint-config-recess-order'
	],
	'rules': {
		'order/properties-order': [
			{
				'properties': [
					'all'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'content',
					'position',
					'top',
					'right',
					'bottom',
					'left',
					'z-index'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'display',
					'flex',
					'flex-grow',
					'flex-shrink',
					'flex-basis',
					'flex-flow',
					'-ms-flex-direction',
					'flex-direction',
					'flex-wrap',
					'justify-content',
					'align-content',
					'align-items',
					'order',
					'align-self',
					'justify-self'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'grid',
					'grid-area',
					'grid-auto-columns',
					'grid-auto-flow',
					'grid-auto-rows',
					'grid-column',
					'grid-column-end',
					'grid-column-gap',
					'grid-column-start',
					'grid-gap',
					'grid-row',
					'grid-row-end',
					'grid-row-gap',
					'grid-row-start',
					'grid-template',
					'grid-template-areas',
					'grid-template-columns',
					'grid-template-rows',
					'float',
					'clear',
					'box-sizing'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'width',
					'min-width',
					'max-width',
					'height',
					'min-height',
					'max-height',
					'margin',
					'margin-top',
					'margin-right',
					'margin-bottom',
					'margin-left',
					'padding',
					'padding-top',
					'padding-right',
					'padding-bottom',
					'padding-left',
					'overflow',
					'overflow-x',
					'overflow-y',
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'list-style',
					'list-style-position',
					'list-style-type',
					'list-style-image',
					'border-collapse',
					'border-spacing',
					'table-layout',
					'empty-cells',
					'caption-side'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'font',
					'font-family',
					'font-size',
					'line-height',
					'font-weight',
					'text-align',
					'vertical-align',
					'direction',
					'color',
					'text-transform',
					'text-decoration',
					'font-style',
					'font-variant',
					'font-size-adjust',
					'font-stretch',
					'font-effect',
					'font-emphasize',
					'font-emphasize-position',
					'font-emphasize-style',
					'font-smooth',
					'text-align-last',
					'letter-spacing',
					'word-spacing',
					'white-space',
					'text-emphasis',
					'text-emphasis-color',
					'text-emphasis-style',
					'text-emphasis-position',
					'text-indent',
					'text-justify',
					'text-outline',
					'text-wrap',
					'text-overflow',
					'text-overflow-ellipsis',
					'text-overflow-mode',
					'text-orientation',
					'word-wrap',
					'word-break',
					'overflow-wrap',
					'tab-size',
					'hyphens',
					'unicode-bidi',
					'columns',
					'column-count',
					'column-fill',
					'column-gap',
					'column-rule',
					'column-rule-color',
					'column-rule-style',
					'column-rule-width',
					'column-span',
					'column-width',
					'text-shadow',
					'page-break-after',
					'page-break-before',
					'page-break-inside'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'src',
					'background',
					'background-color',
					'background-image',
					'background-repeat',
					'background-position',
					'background-position-x',
					'background-position-y',
					'background-size',
					'background-clip',
					'background-origin',
					'background-attachment',
					'box-decoration-break',
					'background-blend-mode',
					'border',
					'border-width',
					'border-style',
					'border-color',
					'border-top',
					'border-top-width',
					'border-top-style',
					'border-top-color',
					'border-right',
					'border-right-width',
					'border-right-style',
					'border-right-color',
					'border-bottom',
					'border-bottom-width',
					'border-bottom-style',
					'border-bottom-color',
					'border-left',
					'border-left-width',
					'border-left-style',
					'border-left-color',
					'border-radius',
					'border-top-left-radius',
					'border-top-right-radius',
					'border-bottom-right-radius',
					'border-bottom-left-radius',
					'border-image',
					'border-image-source',
					'border-image-slice',
					'border-image-width',
					'border-image-outset',
					'border-image-repeat',
					'outline',
					'outline-width',
					'outline-style',
					'outline-color',
					'outline-offset',
					'box-shadow'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'transform',
					'transform-origin',
					'backface-visibility',
					'perspective',
					'perspective-origin',
					'transform-style',
					'visibility',
					'cursor',
					'opacity',
					'interpolation-mode',
					'filter',
					'backdrop-filter',
					'transition',
					'transition-delay',
					'transition-timing-function',
					'transition-duration',
					'transition-property'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'animation',
					'animation-name',
					'animation-duration',
					'animation-play-state',
					'animation-timing-function',
					'animation-delay',
					'animation-iteration-count',
					'animation-direction',
					'animation-fill-mode'
				]
			},
			{
				'emptyLineBefore': 'always',
				'noEmptyLineBetween': true,
				'properties': [
					'appearance',
					'clip',
					'clip-path',
					'counter-reset',
					'counter-increment',
					'resize',
					'user-select',
					'nav-index',
					'nav-up',
					'nav-right',
					'nav-down',
					'nav-left',
					'pointer-events',
					'quotes',
					'touch-action',
					'will-change',
					'zoom',
					'fill',
					'fill-rule',
					'clip-rule',
					'stroke'
				]
			}
		]
	}
}