/**
 * GLea - GL experience audience Library
 * @module glea
 */
export declare type GLeaContext =
  | WebGLRenderingContext
  | WebGL2RenderingContext;
/**
 * store for an attribute and a buffer
 */
export declare type GLeaBuffer = {
  id: WebGLBuffer;
  name: string;
  data: ArrayBuffer;
  loc: number;
  type: number;
  size: number;
};
/**
 * function that compiles a shader
 */
export declare type GLeaShaderFactory = (gl: GLeaContext) => WebGLShader;
/**
 * function that registers an attribute and binds a buffer to it
 */
export declare type GLeaBufferFactory = (
  name: string,
  gl: GLeaContext,
  program: WebGLProgram
) => GLeaBuffer;
export declare type GLeaConstructorParams = {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  contextType: string;
  shaders: GLeaShaderFactory[];
  buffers: Record<string, GLeaBufferFactory>;
  devicePixelRatio: number;
  glOptions: WebGLContextAttributes;
};
/** Class GLea */
declare class GLea {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  shaderFactory: GLeaShaderFactory[];
  bufferFactory: Record<string, GLeaBufferFactory>;
  program: WebGLProgram;
  buffers: Record<string, GLeaBuffer>;
  textures: WebGLTexture[];
  devicePixelRatio: number;
  constructor({
    canvas,
    gl,
    contextType,
    shaders,
    buffers,
    devicePixelRatio,
    glOptions,
  }: GLeaConstructorParams);
  /**
   * Create a vertex shader
   *
   * @param code shader code
   */
  static vertexShader(code: string): (gl: GLeaContext) => WebGLShader;
  /**
   * Create a fragment shader
   *
   * @param {string} code fragment shader code
   */
  static fragmentShader(code: string): (gl: GLeaContext) => WebGLShader;
  /**
   * Create Buffer
   *
   * @param {number}   size buffer size
   * @param {number[]} data buffer data
   * @param {number}   usage usage, by default gl.STATIC_DRAW
   * @param {number}   type data type, by default gl.FLOAT
   * @param {boolean}  normalized normalize data, false
   * @param {number}   stride stride, by default 0
   * @param {number}   offset offset, by default 0
   */
  static buffer(
    size: number,
    data: number[] | Uint8Array | Float32Array,
    usage?: number,
    type?: number,
    normalized?: boolean,
    stride?: number,
    offset?: number
  ): GLeaBufferFactory;
  /**
   * init WebGLRenderingContext
   * @returns {GLea} glea instance
   */
  create(): this;
  /**
   * Set active texture
   * @param {number} textureIndex texture index in the range [0 .. gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1]
   * @param {WebGLTexture} texture webgl texture object
   */
  setActiveTexture(textureIndex: number, texture: WebGLTexture): void;
  /**
   * @typedef GLeaTextureOptions
   * @property {string} textureWrapS default: clampToEdge
   * @property {string} textureWrapT default: clampToEdge
   * @property {string} textureMinFilter default: nearest
   * @property {string} textureMagFilter default: nearest
   */
  /**
   * Create a texture object
   *
   * @param {number} textureIndex
   * @param {GLeaTextureOptions} params configuration options
   * @returns texture WebGLTexture object
   */
  createTexture(
    textureIndex?: number,
    params?: Record<string, string>
  ): WebGLTexture;
  /**
   * Update buffer data
   * @param {string} name name
   * @param {number} offset default: 0
   */
  updateBuffer(name: string, offset?: number): void;
  /**
   * Resize canvas and webgl viewport
   */
  resize(): void;
  /**
   * Get canvas width
   * @returns {number} canvas width
   */
  get width(): number;
  /**
   * Get canvas height
   * @returns {number} canvas height
   */
  get height(): number;
  /**
   * Use program
   */
  use(): this;
  /**
   * set uniform matrix (mat2, mat3, mat4)
   * @param name uniform name
   * @param data array of numbers (4 for mat2, 9 for mat3, 16 for mat4)
   * @returns location id of the uniform
   */
  uniM(name: string, data: Float32Array | number[]): WebGLUniformLocation;
  /**
   * Set uniform float vector
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform float vector
   */
  uniV(name: string, data: Float32Array | number[]): WebGLUniformLocation;
  /**
   * Set uniform int vector
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform int vector
   */
  uniIV(name: string, data: Int32Array | number[]): WebGLUniformLocation | null;
  /**
   * Set uniform float
   *
   * @param {string} name uniform variable name
   * @param {number} data data
   */
  uni(name: string, data: number): WebGLUniformLocation | null;
  /**
   * Set uniform int
   * @param {string} name uniform variable name
   * @param {number} data data
   */
  uniI(name: string, data: number): void;
  /**
   * Clear screen
   *
   * @param {number[]} clearColor
   */
  clear(clearColor?: number[] | null): void;
  /**
   * destroys the WebGLRendering context by deleting all textures, buffers and shaders.
   * Additionally, it calls loseContext.
   * Also the canvas element is removed from the DOM and replaced by a new cloned canvas element
   */
  destroy(): void;
}
export default GLea;