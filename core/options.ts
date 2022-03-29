/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
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

/**
 * @fileoverview Object that controls settings for the workspace.
 * @author fenichel@google.com (Rachel Fenichel)
 */

import { Colours } from './colours';
import { ToolboxPosition } from './constants';


export interface ZoomOptions {
  /** Set to true to show zoom-centre, zoom-in, and zoom-out buttons. Defaults to false. */
  controls: boolean,

  /** Set to true to allow the mouse wheel to zoom. Defaults to false. */
  wheel: boolean,

  /**
   * Initial magnification factor. For applications with multiple levels,
   * startScale is often set to a higher value on the first level, then incrementally
   * decreased as subsequent levels become more complex. Defaults to 1.0.
   */
  startScale: number,

  /** Maximum multiplication factor for how far one can zoom in. Defaults to 3. */
  maxScale: number,

  /** Minimum multiplication factor for how far one can zoom out. Defaults to 0.3. */
  minScale: number,

  /**
   * For each zooming in-out step the scale is multiplied or divided respectively
   * by the scale speed, this means that: scale = scaleSpeed ^ steps. Note that in
   * this formula steps of zoom-out are subtracted and zoom-in steps are added.
   * Defaults to 1.2.
   */
  scaleSpeed: number,

  /**
   * Set to true to enable pinch to zoom support on touch devices.
   * Defaults to true if either the wheel or controls option is set to true.
   */
  pinch: boolean,
}

export interface Options {
  /** If true, mirror the editor (for Arabic or Hebrew locales). Defaults to false. */
  rtl: boolean;

  /** If true, prevent the user from editing. Suppresses the toolbox and trashcan. Defaults to false. */
  readOnly: boolean;

  /** Path from page (or frame) to the Scratch Blocks media directory. */
  pathToMedia: string;
  
  hasCategories: boolean;

  /** Displays or hides the trashcan. Defaults to true if the toolbox has categories, false otherwise. */
  hasTrashcan: boolean;

  /**
   * Sets whether the workspace is scrollable or not. Defaults to true
   * if the toolbox has categories, false otherwise.
   */
  hasScrollbars: boolean;

  /** If false, disables sounds. Defaults to true. */
  hasSounds: boolean;

  /** If false, don't inject CSS (providing CSS becomes the document's responsibility). Defaults to true. */
  hasCss: boolean;

  /** Allows blocks to be collapsed or expanded. Defaults to true if the toolbox has categories, false otherwise. */
  collapse: boolean; // TODO Rename to canBlocksBeCollapsed

  /** Allows blocks to have comments. Defaults to true if the toolbox has categories, false otherwise. */
  hasComments: boolean;

  /** Allows blocks to be disabled. Defaults to true if the toolbox has categories, false otherwise. */
  disable: boolean; // TODO Rename to canBlocksBeDisabled

  /** If true list and string operations should index from 1, if false index from 0. Defaults to true. */
  oneBasedIndex: boolean;

  /** If true, uses the horizontal grammar for displaying blocks. Defaults to false. */
  horizontalLayout: boolean;

  toolboxPosition: ToolboxPosition;

  /**
   * string, XML or JSON	Tree structure of categories and blocks available to the user.
   * See defining the toolbox for more information.
   */
  toolbox: unknown; // ! Toolbox

  colours: Colours;

  /** Configures a grid which blocks may snap to. See https://developers.google.com/blockly/guides/configure/web/grid */
  gridOptions: unknown; // ! GridOptions

  /** Configures zooming behaviour. */
  zoomOptions: ZoomOptions;

  languageTree: Element | undefined;

  /** The parent of the current workspace, or null if there is no parent workspace. */
  parentWorkspace: Workspace | undefined;

  /** If set, sets the translation of the workspace to match the scrollbars. */
  setMetrics: Function | undefined;

  /**
   * Return an object with the metrics required to size the workspace.
   * @return {Object} Contains size and position metrics, or null.
   */
  getMetrics: Function | undefined;
}

export interface Preferences
extends Omit<Partial<Options>, 'hasCategories' | 'toolboxPosition' | 'colours'>
{
  /**
   * If "start" toolbox is on top (if horizontal) or left (if vertical and LTR) or
   * right (if vertical and RTL). If "end" toolbox is on opposite side.
   * Defaults to "start".
   */
  toolboxPosition?: 'start' | 'end' | ToolboxPosition;

  colours?: Partial<Colours>;
}



/**
 * Parse the user-specified options, using reasonable defaults where behaviour
 * is unspecified.
 * @param {!Object} options Dictionary of options.  Specification:
 *   https://developers.google.com/blockly/guides/get-started/web#configuration
 * @constructor
 */
export function fillInDefaults(options: Preferences): Options {
  const { parentWorkspace, toolbox, setMetrics, getMetrics } = options;
  let {
    readOnly,
    colours,
    languageTree,
    hasTrashcan,
    hasComments,
    disable,
    hasSounds,
    collapse,
    rtl,
    horizontalLayout,
    toolboxPosition,
    hasCss,
    hasScrollbars,
    pathToMedia,
    oneBasedIndex,
  } = options;

  readOnly = readOnly ?? false;

  let hasCategories: boolean | undefined;

  if (readOnly) {
    languageTree = undefined;
    hasCategories = false;
    hasTrashcan = false;
    collapse = false;
    hasComments = false;
    disable = false;
    hasSounds = false;
  }

  // // parse default toolbox from xml 🤮
  // if (options.toolbox === undefined && Blockly.Blocks.defaultToolbox !== undefined) {
  //   var oParser = new DOMParser();
  //   var dom = oParser.parseFromString(Blockly.Blocks.defaultToolbox, 'text/xml');
  //   options['toolbox'] = dom.documentElement;
  // }

  languageTree = parseToolboxTree(toolbox);

  // https://github.com/microsoft/TypeScript/issues/48473
  hasCategories = hasCategories ??
    (languageTree !== undefined && languageTree.getElementsByTagName('category').length > 0);
  
  hasTrashcan ??= hasCategories;
  hasComments ??= hasCategories;
  hasScrollbars ??= hasCategories;
  collapse ??= hasCategories;
  disable ??= hasCategories;

  horizontalLayout ??= false;
  hasSounds ??= true;
  rtl ??= false;

  hasCss ??= true;
  oneBasedIndex ??= true;

  
  if (toolboxPosition === 'start' || toolboxPosition === 'end') {
    if (horizontalLayout) {
      toolboxPosition = toolboxPosition === 'start' ? ToolboxPosition.Top : ToolboxPosition.Bottom;
    } else if (rtl) {
      toolboxPosition = toolboxPosition === 'start' ? ToolboxPosition.Right : ToolboxPosition.Left;
    } else {
      toolboxPosition = toolboxPosition === 'start' ? ToolboxPosition.Left : ToolboxPosition.Right;
    }
  }

  pathToMedia ??= 'https://blockly-demo.appspot.com/static/media/';

  const completedColours = {...Colours, ...colours};

  return {
    rtl,
    colours: completedColours,
    toolbox,
    parentWorkspace,
    getMetrics,
    setMetrics,
    oneBasedIndex,
    collapse,
    hasComments,
    disable,
    readOnly,
    pathToMedia : pathToMedia,
    hasCategories : hasCategories,
    hasScrollbars : hasScrollbars,
    hasTrashcan : hasTrashcan,
    hasSounds : hasSounds,
    hasCss : hasCss,
    horizontalLayout : horizontalLayout,
    languageTree : languageTree,
    gridOptions : parseGridOptions(options),
    zoomOptions : parseZoomOptions(options),
    toolboxPosition : toolboxPosition,
  };
}



/**
 * Parse the user-specified zoom options, using reasonable defaults where
 * behaviour is unspecified.  See zoom documentation:
 *   https://developers.google.com/blockly/guides/configure/web/zoom
 * @param {!Object} options Dictionary of options.
 * @return {!Object} A dictionary of normalized options.
 * @private
 */
export function parseZoomOptions(options?: Partial<ZoomOptions>): ZoomOptions {
  options = options ?? {};

  var zoomOptions = {};
  if (zoom['controls'] === undefined) {
    zoomOptions.controls = false;
  } else {
    zoomOptions.controls = !!zoom['controls'];
  }
  if (zoom['wheel'] === undefined) {
    zoomOptions.wheel = false;
  } else {
    zoomOptions.wheel = !!zoom['wheel'];
  }
  if (zoom['startScale'] === undefined) {
    zoomOptions.startScale = 1;
  } else {
    zoomOptions.startScale = parseFloat(zoom['startScale']);
  }
  if (zoom['maxScale'] === undefined) {
    zoomOptions.maxScale = 3;
  } else {
    zoomOptions.maxScale = parseFloat(zoom['maxScale']);
  }
  if (zoom['minScale'] === undefined) {
    zoomOptions.minScale = 0.3;
  } else {
    zoomOptions.minScale = parseFloat(zoom['minScale']);
  }
  if (zoom['scaleSpeed'] === undefined) {
    zoomOptions.scaleSpeed = 1.2;
  } else {
    zoomOptions.scaleSpeed = parseFloat(zoom['scaleSpeed']);
  }
  return zoomOptions;
}

/**
 * Parse the user-specified grid options, using reasonable defaults where
 * behaviour is unspecified. See grid documentation:
 *   https://developers.google.com/blockly/guides/configure/web/grid
 * @param {!Object} options Dictionary of options.
 * @return {!Object} A dictionary of normalized options.
 * @private
 */
export function parseGridOptions(options) {
  var grid = options['grid'] || {};
  var gridOptions = {};
  gridOptions.spacing = parseFloat(grid['spacing']) || 0;
  gridOptions.colour = grid['colour'] || '#888';
  gridOptions.length = parseFloat(grid['length']) || 1;
  gridOptions.snap = gridOptions.spacing > 0 && !!grid['snap'];
  return gridOptions;
}

/**
 * Parse the provided toolbox tree into a consistent DOM format.
 * @param {Node|string} tree DOM tree of blocks, or text representation of same.
 * @return {Node} DOM tree of blocks, or null.
 */
export function parseToolboxTree(tree) {
  if (tree) {
    if (typeof tree != 'string') {
      if (typeof XSLTProcessor == 'undefined' && tree.outerHTML) {
        // In this case the tree will not have been properly built by the
        // browser. The HTML will be contained in the element, but it will
        // not have the proper DOM structure since the browser doesn't support
        // XSLTProcessor (XML -> HTML). This is the case in IE 9+.
        tree = tree.outerHTML;
      } else if (!(tree instanceof Element)) {
        tree = null;
      }
    }
    if (typeof tree == 'string') {
      tree = Blockly.Xml.textToDom(tree);
    }
  } else {
    tree = null;
  }
  return tree;
}
