/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


// TODO proper checking once TS is able to do it
export type HexColour = `#${string}`;
export type RGBAColour = `rgba(${string})`;
export type CasedColourName = (
  'AliceBlue' | 'AntiqueWhite' | 'Aqua' | 'Aquamarine' | 'Azure' | 'Beige' | 'Bisque' | 'Black' |
  'BlanchedAlmond' | 'Blue' | 'BlueViolet' | 'Brown' | 'BurlyWood' | 'CadetBlue' | 'Chocolate' |
  'Coral' | 'CornflowerBlue' | 'Cornsilk' | 'Crimson' | 'Cyan' | 'DarkBlue' | 'DarkCyan' |
  'DarkGoldenRod' | 'DarkGray' | 'DarkGreen' | 'DarkKhaki' | 'DarkMagenta' | 'DarkOliveGreen' |
  'DarkOrange' | 'DarkOrchid' | 'DarkRed' | 'DarkSalmon' | 'DarkSeaGreen' | 'DarkSlateBlue' |
  'DarkSlateGray' | 'DarkTurquoise' | 'DarkViolet' | 'DeepPink' | 'DeepSkyBlue' | 'DimGray' |
  'DodgerBlue' | 'FireBrick' | 'FloralWhite' | 'ForestGreen' | 'Fuchsia' | 'Gainsboro' |
  'GhostWhite' | 'Gold' | 'GoldenRod' | 'Gray' | 'Green' | 'GreenYellow' | 'HoneyDew' | 'HotPink' |
  'IndianRed' | 'Indigo' | 'Ivory' | 'Khaki' | 'Lavender' | 'LavenderBlush' | 'LawnGreen' |
  'LemonChiffon' | 'LightBlue' | 'LightCoral' | 'LightCyan' | 'LightGoldenRodYellow' |
  'LightGray' | 'LightGreen' | 'LightPink' | 'LightSalmon' | 'LightSeaGreen' | 'LightSkyBlue' |
  'LightSlateGray' | 'LightSteelBlue' | 'LightYellow' | 'Lime' | 'LimeGreen' | 'Linen' | 'Magenta' |
  'Maroon' | 'MediumAquaMarine' | 'MediumBlue' | 'MediumOrchid' | 'MediumPurple' | 'MediumSeaGreen' |
  'MediumSlateBlue' | 'MediumSpringGreen' | 'MediumTurquoise' | 'MediumVioletRed' | 'MidnightBlue' |
  'MintCream' | 'MistyRose' | 'Moccasin' | 'NavajoWhite' | 'Navy' | 'OldLace' | 'Olive' | 'OliveDrab' |
  'Orange' | 'OrangeRed' | 'Orchid' | 'PaleGoldenRod' | 'PaleGreen' | 'PaleTurquoise' | 'PaleVioletRed' |
  'PapayaWhip' | 'PeachPuff' | 'Peru' | 'Pink' | 'Plum' | 'PowderBlue' | 'Purple' | 'Red' | 'RosyBrown' |
  'RoyalBlue' | 'SaddleBrown' | 'Salmon' | 'SandyBrown' | 'SeaGreen' | 'SeaShell' | 'Sienna' | 'Silver' |
  'SkyBlue' | 'SlateBlue' | 'SlateGray' | 'Snow' | 'SpringGreen' | 'SteelBlue' | 'Tan' | 'Teal' |
  'Thistle' | 'Tomato' | 'Turquoise' | 'Violet' | 'Wheat' | 'White' | 'WhiteSmoke' | 'Yellow' | 'YellowGreen'
);
export type ColourName = CasedColourName | Lowercase<CasedColourName>;
export type CSSColour = HexColour | RGBAColour | ColourName;

type colourCategories = (
  'motion' | 'looks' | 'sounds' |'control' | 'event' |'sensing' |
  'pen' | 'operators' | 'data' | 'data_lists' | 'more'
);
type specialColourKeys = (
  'text' | 'workspace' | 'toolboxHover' | 'toolboxSelected' |
  'toolboxText' | 'toolbox' | 'flyout' | 'scrollbar' | 'scrollbarHover' |
  'textField' | 'insertionMarker' | 'stackGlow' | 'replacementGlow' |
  'colourPickerStroke' | 'numPadBackground' | 'numPadBorder' |
  'numPadActiveBackground' | 'valueReportBackground' | 'valueReportBorder'
);

type ColoursCategories = {
  [category in colourCategories]: {
    primary: HexColour,
    secondary: HexColour,
    tertiary: HexColour,
  }
}

type ColoursSpecial = {
  [key in specialColourKeys]: HexColour
}

export interface Colours
extends ColoursCategories, ColoursSpecial
{
  // numeric values
  insertionMarkerOpacity: number;
  dragShadowOpacity: number;
  stackGlowSize: number;
  stackGlowOpacity: number;
  replacementGlowSize: number;
  replacementGlowOpacity: number;

  // CSS colours support RGBA
  fieldShadow: CSSColour;
  dropDownShadow: CSSColour;

  // Do not use hex here, it cannot be inlined with data-uri SVG
  // FIXME wtf maybe do proper escaping?!
  numPadText: ColourName;
}

const defaultColours: Colours = {
  // SVG colours: these must be specificed in #RRGGBB style
  // To add an opacity, this must be specified as a separate property (for SVG fill-opacity)
  
  motion: {
    primary: "#4C97FF",
    secondary: "#4280D7",
    tertiary: "#3373CC"
  },
  looks: {
    primary: "#9966FF",
    secondary: "#855CD6",
    tertiary: "#774DCB"
  },
  sounds: {
    primary: "#CF63CF",
    secondary: "#C94FC9",
    tertiary: "#BD42BD"
  },
  control: {
    primary: "#FFAB19",
    secondary: "#EC9C13",
    tertiary: "#CF8B17"
  },
  event: {
    primary: "#FFBF00",
    secondary: "#E6AC00",
    tertiary: "#CC9900"
  },
  sensing: {
    primary: "#5CB1D6",
    secondary: "#47A8D1",
    tertiary: "#2E8EB8"
  },
  pen: {
    primary: "#0fBD8C",
    secondary: "#0DA57A",
    tertiary: "#0B8E69"
  },
  operators: {
    primary: "#59C059",
    secondary: "#46B946",
    tertiary: "#389438"
  },
  data: {
    primary: "#FF8C1A",
    secondary: "#FF8000",
    tertiary: "#DB6E00"
  },
  // This is not a new category, but rather for differentiation
  // between lists and scalar variables.
  data_lists: {
    primary: "#FF661A",
    secondary: "#FF5500",
    tertiary: "#E64D00"
  },
  more: {
    primary: "#FF6680",
    secondary: "#FF4D6A",
    tertiary: "#FF3355"
  },
  text: "#575E75",
  workspace: "#F9F9F9",
  toolboxHover: "#4C97FF",
  toolboxSelected: "#e9eef2",
  toolboxText: "#575E75",
  toolbox: "#FFFFFF",
  flyout: "#F9F9F9",
  scrollbar: "#CECDCE",
  scrollbarHover: '#CECDCE',
  textField: "#FFFFFF",
  insertionMarker: "#000000",
  insertionMarkerOpacity: 0.2,
  dragShadowOpacity: 0.3,
  stackGlow: "#FFF200",
  stackGlowSize: 4,
  stackGlowOpacity: 1,
  replacementGlow: "#FFFFFF",
  replacementGlowSize: 2,
  replacementGlowOpacity: 1,
  colourPickerStroke: "#FFFFFF",
  fieldShadow: "rgba(0,0,0,0.1)",
  dropDownShadow: "rgba(0, 0, 0, .3)",
  numPadBackground: "#547AB2",
  numPadBorder: "#435F91",
  numPadActiveBackground: "#435F91",
  numPadText: "white",
  valueReportBackground: "#FFFFFF",
  valueReportBorder: "#AAAAAA",
};

export const Colours = {
  ...defaultColours,
  
  /**
   * Override the colours in Blockly.Colours with new values basded on the
   * given dictionary.
   * @param {!Object} colours Dictionary of colour properties and new values.
   * @package
   *
   * @deprecated Changes the module globally!
   */
  overrideColours(colours: Partial<Colours>): void {
    Object.assign(Colours, colours);
  }
};
