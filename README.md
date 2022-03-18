# scratch-blocks-modernized

**Scratch Blocks Modernized** is an _unofficial_ fork of MIT's [Scratch Blocks](https://github.com/LLK/scratch-blocks), a visual programming interface which itself is a fork of Google's [Blockly](https://github.com/google/blockly) project. The goal of **Scratch Blocks Modernized** is to... well _modernize_ Scratch Blocks – throw away legacy stuff like Python 2 & Google Closure, and introduce tools like TypeScript and modern bundlers. The project is also not afraid to significantly change the original Blockly's API to make it a better fit with the modern JavaScript ecosystem.

The intended outcomes of this project are:
 * making it trivial to get Scratch Blocks working with modern frameworks such as React, Preact and Svelte
 * making it much simpler for developers to create and maintain their own fork of Scratch Blocks



*This project is in active development and should be considered a "developer preview" at this time.*

## Two Types of Blocks
![](https://cloud.githubusercontent.com/assets/747641/15255731/dad4d028-190b-11e6-9c16-8df7445adc96.png)

Scratch Blocks brings together two different programming "grammars" that the Scratch Team has designed and continued to refine over the past decade. The standard [Scratch](https://scratch.mit.edu) grammar uses blocks that snap together vertically, much like LEGO bricks. For our [ScratchJr](https://scratchjr.org) software, intended for younger children, we developed blocks that are labelled with icons rather than words, and snap together horizontally rather than vertically. We have found that the horizontal grammar is not only friendlier for beginning programmers but also better suited for devices with small screens.

## Documentation
The "getting started" guide including [FAQ](https://scratch.mit.edu/developers#faq) and [design documentation](https://github.com/LLK/scratch-blocks/wiki/Design) can be found in the [wiki](https://github.com/LLK/scratch-blocks/wiki).

## Donate
We provide [Scratch](https://scratch.mit.edu) free of charge, and want to keep it that way! Please consider making a [donation](https://secure.donationpay.org/scratchfoundation/) to support our continued engineering, design, community, and resource development efforts. Donations of any size are appreciated. Thank you!
