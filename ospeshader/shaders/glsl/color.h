/*
       [][][][][][][][][][][][][][][][][][][][]
       [][][][][][][][][][][][][][][][][][][][]
       [][][]                 [][]                 [][][]
       [][][][][]      [][][][]     [][][][][][][]
       [][][][][]      [][][][]                 [][][]
       [][][][][]      [][][][][][][][]      [][][]
       [][][][][]      [][][][]                 [][][]
       [][][][][][][][][][][][][][][][][][][][]
       [][][]                 [][]                [][][]
       [][][]      [][]     [][]      [][][][][][][]
       [][][]                 [][]                [][][]
       [][][]      [][][][][][]     [][][][][][][]
       [][][]      [][][][][][]                [][][]
       [][][][][][][][][][][][][][][][][][][][]
       [][][][][][][][][][][][][][][][][][][][]

———————————————————
              
        TSPE SHADER MADE BY TSPE 
           
     • Twitter - @TSPEShader
         
     • Website - tspe.weebly.com

     • USE OF ANY CODE IS NOT PERMITTED

    
———————————————————
*/


#define TAU 6.28318530718
#define MAX_ITER 5
#define SHOW_TILING
#define PI_METEOR 3.1415926
#define MUL3X(x) 		x * x * x
#define RAINBOW_START_Y	0.0
#define MAX_RADIUS 1
#define DOUBLE_HASH 0
#define HASHSCALE1 0.1031
#define HASHSCALE3 vec3(0.1031, 0.1031, 0.0973)


vec4 stars_color =vec4(1.0);

vec4 sun_color =vec4(1.0,0.7,0.2,1.0);
vec4 moon_color =vec4(1.0,0.9,0.8,1.0);

vec3 circColor = vec3(0.9, 0.2, 0.1);
vec3 circColor2 = vec3(0.3, 0.1, 0.9);
vec3 circColor3 = vec3(0.3, 0.2, 0.0);
vec3 circColor4 = vec3(0.6, 0.3, 0.0);
vec3 flares = vec3(0.53, 0.30, 0.0);

vec3 RAINBOW_POS	= vec3(4.5, 0.0, 0.5);
vec3 RAINBOW_DIR 	= vec3(-0.2, -0.1, 0.0);

const vec3 skyend_a = vec3(0.101961, 0.619608, 0.666667);
const vec3 skyend_b = vec3(0.666667, 0.666667, 0.498039);
const vec3 skyend_c = vec3(0.0, 0.0, 0.164706);
const vec3 skyend_d = vec3(0.666667, 1.0, 1.0);

const float RAINBOW_BRIGHTNESS  	= 1.3;
const float RAINBOW_INTENSITY   	= 0.30;
const vec3  RAINBOW_COLOR_RANGE = vec3(50.0, 53.0, 56.0); 

const float RAINBOW_WATER_SATURATION	= 0.35;
const float RAINBOW_WATER_LIGHTNESS		= 0.1;

vec4 day_color = vec4(1.4,1.37,1.27,0.05);
vec4 sunset_color = vec4(0.8,0.52,0.30,0.1);
vec4 night_color = vec4(0.12,0.216,0.48,0.3);
vec4 rain_color = vec4(vec3(0.45),-0.01);

vec4 shadow_color = vec4(0.5,0.68,0.82,-0.03);
vec4 dark_sh_color = vec4(0.30,0.30,0.30,-0.06);

vec4 lights_color = vec4(0.6,0.23,0.05,0.2);

vec4 cloud_day_color = vec4(1.0);
vec4 cloud_sunset_color = vec4(1.0,0.6,0.3,1.0);
vec4 cloud_night_color = vec4(0.12,0.18,0.25,1.0);
vec4 cloud_rain_color = vec4(0.9);

vec4 nether_color = vec4(0.6,0.45,0.4,0.04);
vec4 nether_lights_color = vec4(1.5,0.6,0.0,0.2);
vec4 un_water_color = vec4(0.6,1.0,1.5,1.0);
vec4 unwater_lights_color = vec4(0.1,0.3,1.0,0.2);
vec4 ender_lights_color = vec4(0.7,0.25,0.0,0.1);
vec4 ender_color = vec4(0.25,0.48,0.6,0.01);

vec3 torch_a = vec3(0.6,0.3,0.0);
vec3 torch_b = vec3(1.7,1.8,1.9);
vec3 torch_c = vec3(0.5,0.9,1.0);
vec3 torch_d = vec3(0.81,0.83,0.85);
vec3 torch_e = vec3(0.0,0.0,0.0);

vec4 sky_day_color = vec4(0.2,0.42,0.66,1.0);//vec4(0.0, 0.35, 0.5,1.0);//vec4(0.1,0.10,0.45,1.0);
vec4 sky_sunset_color = vec4(0.1,0.1,0.2,1.0);
vec4 sky_night_color = vec4(0.25,0.6,0.8,0.0)*0.125;//vec4(0.0,0.07,0.20,1.0);
vec4 sky_rain_color = vec4(1.3);

vec3 rainbow_pos;
vec3 rainbow_camera_dir;
vec3 rainbow_up; 
vec3 rainbow_vertical;
vec3 rainbow_w;