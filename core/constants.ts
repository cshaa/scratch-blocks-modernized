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
 * @fileoverview Blockly constants.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';



/**
 * Number of pixels the mouse must move before a drag starts.
 */
export const DRAG_RADIUS = 3 as const;

/**
 * Number of pixels the mouse must move before a drag/scroll starts from the
 * flyout.  Because the drag-intention is determined when this is reached, it is
 * larger than Blockly.DRAG_RADIUS so that the drag-direction is clearer.
 */
export const FLYOUT_DRAG_RADIUS = 10 as const;

/**
 * Maximum misalignment between connections for them to snap together.
 */
export const SNAP_RADIUS = 48 as const;

/**
 * Maximum misalignment between connections for them to snap together,
 * when a connection is already highlighted.
 */
export const CONNECTING_SNAP_RADIUS = 68 as const;

/**
 * How much to prefer staying connected to the current connection over moving to
 * a new connection.  The current previewed connection is considered to be this
 * much closer to the matching connection on the block than it actually is.
 */
export const CURRENT_CONNECTION_PREFERENCE = 20 as const;

/**
 * Delay in ms between trigger and bumping unconnected block out of alignment.
 */
export const BUMP_DELAY = 0 as const;

/**
 * Number of characters to truncate a collapsed block to.
 */
export const COLLAPSE_CHARS = 30 as const;

/**
 * Length in ms for a touch to become a long press.
 */
export const LONGPRESS = 750 as const;

/**
 * Distance to scroll when a mouse wheel event is received and its delta mode
 * is line (0x1) instead of pixel (0x0). In these cases, a single "scroll" has
 * a delta of 1, which makes the workspace scroll very slowly (just one pixel).
 * To compensate, that delta is multiplied by this value.
 * @const
 * @package
 */
export const LINE_SCROLL_MULTIPLIER = 15 as const;

/**
 * Prevent a sound from playing if another sound preceded it within this many
 * milliseconds.
 */
export const SOUND_LIMIT = 100 as const;

/**
 * When dragging a block out of a stack, split the stack in two (true), or drag
 * out the block healing the stack (false).
 */
export const DRAG_STACK = true as const;

/**
 * The richness of block colours, regardless of the hue.
 * Must be in the range of 0 (inclusive) to 1 (exclusive).
 */
export const HSV_SATURATION = 0.45 as const;

/**
 * The intensity of block colours, regardless of the hue.
 * Must be in the range of 0 (inclusive) to 1 (exclusive).
 */
export const HSV_VALUE = 0.65 as const;

/**
 * Sprited icons and images.
 */
export const SPRITE = {
  width: 96,
  height: 124,
  url: 'sprites.png'
} as const;

// Constants below this point are not intended to be changed.

/**
 * Required name space for SVG elements.
 * @const
 */
export const SVG_NS = 'http://www.w3.org/2000/svg' as const;

/**
 * Required name space for HTML elements.
 * @const
 */
export const HTML_NS = 'http://www.w3.org/1999/xhtml' as const;

/**
 * Enum for a right- or left-facing value input and for up- or down-facing block stacks.
 * @const
 */
export enum ConnectionType {
  /** Right-facing value input.  E.g. 'set item to' or 'return'. */
  Input = 1,

  /** Left-facing value output.  E.g. 'random fraction'. */
  Output = 2,

  /** Down-facing block stack.  E.g. 'if-do' or 'else' */
  NextStatement = 3,

  /** Up-facing block stack.  E.g. 'break out of loop'. */
  PreviousStatement = 4,

  /** Used to add field(s) with no input. */
  DummyInput = 5,
}

/**
 * ENUM for a right-facing value input.  E.g. 'set item to' or 'return'.
 * @const
 * @deprecated
 */
export const INPUT_VALUE = ConnectionType.Input as const;

/**
 * ENUM for a left-facing value output.  E.g. 'random fraction'.
 * @const
 * @deprecated
 */
export const OUTPUT_VALUE = ConnectionType.Output as const;

/**
 * ENUM for a down-facing block stack.  E.g. 'if-do' or 'else'.
 * @const
 * @deprecated
 */
export const NEXT_STATEMENT = ConnectionType.NextStatement as const;

/**
 * ENUM for an up-facing block stack.  E.g. 'break out of loop'.
 * @const
 * @deprecated
 */
export const PREVIOUS_STATEMENT = ConnectionType.PreviousStatement as const;

/**
 * ENUM for an dummy input.  Used to add field(s) with no input.
 * @const
 * @deprecated
 */
export const DUMMY_INPUT = ConnectionType.DummyInput as const;

/**
 * Enum for left, centre and right alignment.
 * @const
 */
export enum Align {
  Left = -1,
  Centre = 0,
  Right = 1,
}

/**
 * ENUM for left alignment.
 * @const
 * @deprecated
 */
export const ALIGN_LEFT = Align.Left as const;

/**
 * ENUM for centre alignment.
 * @const
 * @deprecated
 */
export const ALIGN_CENTRE = Align.Centre as const;

/**
 * ENUM for right alignment.
 * @const
 * @deprecated
 */
export const ALIGN_RIGHT = Align.Right as const;

/**
 * Enum for drag operations.
 * @const
 */
export enum Drag {
  /** No drag operation. */
  None = 0,

  /** Inside the sticky DRAG_RADIUS. */
  Sticky = 1,

  /** Freely draggable (outside the DRAG_RADIUS, if one applies). */
  Free = 2,
}


/**
 * ENUM for no drag operation.
 * @const
 * @deprecated
 */
export const DRAG_NONE = Drag.None as const;

/**
 * ENUM for inside the sticky DRAG_RADIUS.
 * @const
 * @deprecated
 */
export const DRAG_STICKY = Drag.Sticky as const;

/**
 * ENUM for inside the non-sticky DRAG_RADIUS, for differentiating between
 * clicks and drags.
 * @const
 * !FIXME wtf. DRAG_STICKY === DRAG_BEGIN
 */
export const DRAG_BEGIN = 1 as const;

/**
 * ENUM for freely draggable (outside the DRAG_RADIUS, if one applies).
 * @const
 * @deprecated
 */
export const DRAG_FREE = Drag.Free as const;

/**
 * Lookup table for determining the opposite type of a connection.
 * @const
 */
export const OPPOSITE_TYPE: { [t in ConnectionType]: ConnectionType } = {
  [ConnectionType.Input]: ConnectionType.Output,
  [ConnectionType.Output]: ConnectionType.Input,
  [ConnectionType.NextStatement]: ConnectionType.PreviousStatement,
  [ConnectionType.PreviousStatement]: ConnectionType.NextStatement,
  [ConnectionType.DummyInput]: ConnectionType.DummyInput,
};


/**
 * Enum for the position of toolbox.
 * @const
 */
export enum ToolboxPosition {
  Top = 0,
  Bottom = 1,
  Left = 2,
  Right = 3,
}

/**
 * ENUM for toolbox and flyout at top of screen.
 * @const
 * @deprecated
 */
export const TOOLBOX_AT_TOP = ToolboxPosition.Top as const;

/**
 * ENUM for toolbox and flyout at bottom of screen.
 * @const
 * @deprecated
 */
export const TOOLBOX_AT_BOTTOM = ToolboxPosition.Bottom as const;

/**
 * ENUM for toolbox and flyout at left of screen.
 * @const
 * @deprecated
 */
export const TOOLBOX_AT_LEFT = ToolboxPosition.Left as const;

/**
 * ENUM for toolbox and flyout at right of screen.
 * @const
 * @deprecated
 */
export const TOOLBOX_AT_RIGHT = ToolboxPosition.Right as const;


/**
 * Enum for the shapes of reporters.
 */
export enum OutputShape {
  /** Hexagonal shape for booleans / predicates. */
  Hexagonal = 1,

  /** Rounded shape for numbers. */
  Round = 2,

  /** Rectangular shape for strings & other values. */
  Square = 3,
}

/**
 * ENUM for output shape: hexagonal (booleans/predicates).
 * @const
 * @deprecated
 */
export const OUTPUT_SHAPE_HEXAGONAL = OutputShape.Hexagonal as const;

/**
 * ENUM for output shape: rounded (numbers).
 * @const
 * @deprecated
 */
export const OUTPUT_SHAPE_ROUND = OutputShape.Round as const;

/**
 * ENUM for output shape: squared (any/all values; strings).
 * @const
 * @deprecated
 */
export const OUTPUT_SHAPE_SQUARE = OutputShape.Square as const;

/**
 * Enum for block categories.
 * @const
 */
export enum Categories {
  motion = "motion",
  looks = "looks",
  sound = "sounds",
  pen = "pen",
  data = "data",
  dataLists = "data-lists",
  event = "events",
  control = "control",
  sensing = "sensing",
  operators = "operators",
  more = "more",
}

/**
 * Enum representing the possible areas for deleting blocks.
 */
export enum DeleteArea {
  /** An event is not in any delete areas. Null for backwards compatibility reasons. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  None = null as any,

  /** An event is in the delete area of the trash can. */
  Trash = 1,

  /** An event is in the delete area of the toolbox or flyout.*/
  Toolbox = 2,

}

/**
 * ENUM representing that an event is not in any delete areas.
 * Null for backwards compatibility reasons.
 * @const
 * @deprecated
 */
export const DELETE_AREA_NONE = DeleteArea.None;

/**
 * ENUM representing that an event is in the delete area of the trash can.
 * @const
 * @deprecated
 */
export const DELETE_AREA_TRASH = DeleteArea.Trash;

/**
 * ENUM representing that an event is in the delete area of the toolbox or
 * flyout.
 * @const
 * @deprecated
 */
export const DELETE_AREA_TOOLBOX = DeleteArea.Toolbox;

/**
 * String for use in the "custom" attribute of a category in toolbox xml.
 * This string indicates that the category should be dynamically populated with
 * variable blocks.
 * @const {string}
 */
export const VARIABLE_CATEGORY_NAME = 'VARIABLE' as const;

/**
 * String for use in the "custom" attribute of a category in toolbox xml.
 * This string indicates that the category should be dynamically populated with
 * procedure blocks.
 * @const {string}
 */
export const PROCEDURE_CATEGORY_NAME = 'PROCEDURE' as const;

/**
 * String for use in the dropdown created in field_variable.
 * This string indicates that this option in the dropdown is 'Rename
 * variable...' and if selected, should trigger the prompt to rename a variable.
 * @const {string}
 */
export const RENAME_VARIABLE_ID = 'RENAME_VARIABLE_ID' as const;

/**
 * String for use in the dropdown created in field_variable.
 * This string indicates that this option in the dropdown is 'Delete the "%1"
 * variable' and if selected, should trigger the prompt to delete a variable.
 * @const {string}
 */
export const DELETE_VARIABLE_ID = 'DELETE_VARIABLE_ID' as const;

/**
 * String for use in the dropdown created in field_variable,
 * specifically for broadcast messages.
 * This string indicates that this option in the dropdown is 'New message...'
 * and if selected, should trigger the prompt to create a new message.
 * @const {string}
 */
export const NEW_BROADCAST_MESSAGE_ID = 'NEW_BROADCAST_MESSAGE_ID' as const;

/**
 * String representing the variable type of broadcast message blocks.
 * This string, for use in differentiating between types of variables,
 * indicates that the current variable is a broadcast message.
 * @const {string}
 */
export const BROADCAST_MESSAGE_VARIABLE_TYPE = 'broadcast_msg' as const;

/**
 * String representing the variable type of list blocks.
 * This string, for use in differentiating between types of variables,
 * indicates that the current variable is a list.
 * @const {string}
 */
export const LIST_VARIABLE_TYPE = 'list' as const;

// TODO (#1251) Replace '' below with 'scalar', and start using this constant
// everywhere.
/**
 * String representing the variable type of scalar variables.
 * This string, for use in differentiating between types of variables,
 * indicates that the current variable is a scalar variable.
 * @const {string}
 */
export const SCALAR_VARIABLE_TYPE = '' as const;

/**
 * The type of all procedure definition blocks.
 * @const {string}
 */
export const PROCEDURES_DEFINITION_BLOCK_TYPE = 'procedures_definition' as const;

/**
 * The type of all procedure prototype blocks.
 * @const {string}
 */
export const PROCEDURES_PROTOTYPE_BLOCK_TYPE = 'procedures_prototype' as const;

/**
 * The type of all procedure call blocks.
 * @const {string}
 */
export const PROCEDURES_CALL_BLOCK_TYPE = 'procedures_call' as const;

/**
 * ENUM for flyout status button states.
 * @const
 */
export enum StatusButtonState {
  Ready = "ready",
  NotReady = "not ready",
}
