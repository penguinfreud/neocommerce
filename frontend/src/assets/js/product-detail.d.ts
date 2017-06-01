/**
 * Created by 11206 on 2017/5/7.
 */
declare var container: any;
// declare var stats: any;
declare var scene: any;
declare var VIEW_ANGLE: number, ASPECT: number, NEAR: number, FAR: number;
declare var renderer: any;
declare var controls: any;
declare var camera: any;
declare var CAM_POS: number[][];
declare var CAM_LOOKAT: number[][];
declare var MODEL_POS: number[][];
declare var MODEL_SCALE: number[];
declare var MODELS: string[];
declare function init(): void;
declare function onUnload(): void;
declare function threedshow(): void;
declare function animate(): void;
declare function render(): void;
