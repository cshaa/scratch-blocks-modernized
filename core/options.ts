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
import { ToolboxRoot } from './toolbox';
import { Workspace } from './workspace';


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
}

export interface GridOptions {
  /**
   * The most important grid property is `spacing` which defines the distance between
   * the grid's points. The default value is 0, which results in no grid.
   */
  spacing: number,

  /**
   * The `length` property is a number that defines the shape of the grid points.
   * A length of 0 results in an invisible grid (but still one that may be snapped to),
   * a length of 1 (the default value) results in dots, a longer length results in
   * crosses, and a length equal or greater than the spacing results in graph paper.
   */
  length: number,

  /**
   * The `colour` property is a string that sets the colour of the points.
   * Note the British spelling. Use any CSS-compatible format, including `#f00`,
   * `#ff0000`, or `rgb(255, 0, 0)`. The default value is `#888`.
   */
  colour: string,

  /**
   * The `snap` property is a boolean that sets whether blocks should
   * snap to the nearest grid point when placed on the workspace.
   * The default value is `false`.
   */
  snap: boolean,
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
  toolbox: ToolboxRoot;

  colours: Colours;

  /** Configures a grid which blocks may snap to. See https://developers.google.com/blockly/guides/configure/web/grid */
  gridOptions: GridOptions;

  /** Configures zooming behaviour. */
  zoomOptions: ZoomOptions;

  languageTree: Element | undefined;

  /** The parent of the current workspace, or null if there is no parent workspace. */
  parentWorkspace: Workspace | undefined;

  /** If set, sets the translation of the workspace to match the scrollbars. */
  setMetrics?: () => void; // TODO

  /**
   * Return an object with the metrics required to size the workspace.
   * @return {Object} Contains size and position metrics, or null.
   */
  getMetrics?: () => void; // TODO
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
 * @param {!Preferences} options Dictionary of options.  Specification:
 *   https://developers.google.com/blockly/guides/get-started/web#configuration
 * @param {!ToolboxRoot} defaultToolbox The default toolbox from
 *   `blocks_horizontal/default_toolbox.ts` or `blocks_vertical/default_toolbox.ts`
 * @constructor
 */
export function fillInDefaults(options: Preferences, defaultToolbox: ToolboxRoot): Options {
  const {
    parentWorkspace,
    setMetrics,
    getMetrics,
    colours,
    zoomOptions,
    gridOptions,
  } = options;
  let {
    readOnly,
    languageTree,
    hasTrashcan,
    hasComments,
    disable,
    hasSounds,
    collapse,
    toolbox,
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

  toolbox ??= defaultToolbox;

  // https://github.com/microsoft/TypeScript/issues/40359
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

  toolboxPosition ??= 'start';
  
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
    pathToMedia,
    hasCategories,
    hasScrollbars,
    hasTrashcan,
    hasSounds,
    hasCss,
    horizontalLayout,
    languageTree,
    gridOptions : parseGridOptions(gridOptions),
    zoomOptions : parseZoomOptions(zoomOptions),
    toolboxPosition,
  };
}



/**
 * Parse the user-specified zoom options, using reasonable defaults where
 * behaviour is unspecified.  See zoom documentation:
 *   https://developers.google.com/blockly/guides/configure/web/zoom
 * @param {!ZoomOptions} o Dictionary of options.
 * @return {!ZoomOptions} A dictionary of normalized options.
 * @private
 */
export function parseZoomOptions(o?: Partial<ZoomOptions>): ZoomOptions {
  return {
    controls: o?.controls ?? false,
    wheel: o?.wheel ?? false,
    startScale: o?.startScale ?? 1,
    maxScale: o?.maxScale ?? 3,
    minScale: o?.minScale ?? 0.3,
    scaleSpeed: o?.scaleSpeed ?? 1.2,
  };
}

/**
 * Parse the user-specified grid options, using reasonable defaults where
 * behaviour is unspecified. See grid documentation:
 *   https://developers.google.com/blockly/guides/configure/web/grid
 * @param {!GridOptions} o Dictionary of options.
 * @return {!GridOptions} A dictionary of normalized options.
 * @private
 */
export function parseGridOptions(o?: Partial<GridOptions>): GridOptions {
  const spacing = o?.spacing ?? 0;
  return {
    spacing,
    length: o?.length ?? 1,
    colour: o?.colour ?? '#888',
    snap: (o?.snap ?? false) && spacing > 0,
  };
}
