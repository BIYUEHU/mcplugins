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


#include "uniformPerFrameConstants.h"
#include "uniformShaderConstants.h"
#include "uniformRenderChunkConstants.h"
#include "uniformEntityConstants.h"
#include "util.h"
#include "color.h"


float fnight_f;
float fsunset_f;
float frain_f;

float night_f;
float sunset_f;
float rain_f;


bool ender(vec4 fc){

if(((fc.r>fc.g)&&(fc.b>fc.g)&&(fc.b>fc.r))&&(fc.r<0.05&&fc.b<0.05&&fc.g<0.05)){
return true;
}
else{
return false;
}
}

bool nether(vec4 fc){

if((fc.b==fc.g)&&(fc.b*1.5<fc.r)){
return true;
}
else{
return false;
}
}

bool unwater(vec4 fc, float ff){

if(ff>0.8&&(((fc.b>=fc.g*1.2)&&fc.b>=fc.r*2.0)||((fc.g*1.3>=fc.b)&&(fc.r*1.8<fc.g)))){
return true;
}
else{
return false;
}
}


void flagSet(inout float night_f,inout float sunset_f,inout float rain_f,in vec4 light_f,in float f_sh_f,in float flag){

if(flag==0.0){
night_f = max(1.0-min(pow(light_f.r*1.8,5.0),1.0),0.0);
sunset_f = pow(clamp((1.0-pow(light_f.r,5.0))*1.3,0.0,1.0),8.0);
rain_f =clamp((1.0-pow(FOG_CONTROL.y+0.1,10.0)),0.0,1.0);
}
else if(flag==1.0){//fog
night_f =pow(max(min(1.0-light_f.r*1.5,1.0),0.0),1.2);
sunset_f =pow(max(min(1.0-light_f.b*1.2,1.0),0.0),0.5);
rain_f =clamp((1.0-pow(FOG_CONTROL.y+0.1,10.0))*f_sh_f,0.0,1.0);
}
}


highp vec4 StarsEffect(vec4 color, highp vec3 w_pos){

highp float c1 = abs(cos(w_pos.x*2.0+w_pos.z*1.9+TIME*0.71)* 1.7+cos(w_pos.x*2.8-w_pos.z*1.3+TIME*0.81));
highp float c2 = abs(cos(w_pos.x*6.0+w_pos.z*4.5+TIME*0.91)* 1.7+cos(w_pos.x*4.8-w_pos.z*5.3+TIME*1.0))*0.4;
highp float c3 = abs(cos(w_pos.x*4.0+w_pos.z*5.0+TIME*0.31)* 1.7+cos(w_pos.x*5.8-w_pos.z*6.3+TIME*2.0))*0.05;

highp float a1 = max(abs((cos(w_pos.x*0.20+w_pos.z*0.3+TIME*0.81)* 1.7+cos(w_pos.x*0.8-w_pos.z*0.3+TIME*1.0))*c2),0.5);

vec4 stars = color*a1*stars_color+vec4(c3,c2,c1,0.0);
return vec4(stars.rgb * CURRENT_COLOR.rgb * stars.a, stars.a);
}


highp float randz(highp float t) {
	return fract(cos(t) * 3800.0);
}


highp float regShape(highp vec2 p, int N) {

highp float f;
highp float a = atan(p.x,p.y) + 0.2;
highp float b = 6.28319 / float(N);
f = smoothstep(0.5, 0.51, cos(floor(0.5 + a/b) * b - a) * length(p.xy));

return f;
}


highp vec3 circle(highp vec2 p, highp float size, highp float decay, highp vec3 color, highp vec3 color2, highp float dist, highp vec2 mouse){

highp vec2 fc = gl_FragCoord.xy;

highp float l = length(p + mouse * (dist * 4.0)) + size / 2.0;
highp float l2 = length(p + mouse * (dist * 4.0)) + size / 3.0;

highp float c = max(00.01 - pow(length(p / fc + mouse * dist), size * 1.4), 0.0) * 50.0;

highp float c1 = max(0.001 - pow(l - 0.3, 1.0 / 40.0) + sin(l * 30.0), 0.0) * 3.0;

highp float c2 = max(0.04 / pow(length(p / fc - mouse * dist / 2.0 + 0.09) * 1.0, 1.0), 0.0) / 20.0;

highp float s = max(00.01 - pow(regShape(p * 5.0 / fc + mouse * dist * 5.0 + 0.9, 6), 1.0), 0.0) * 5.0;

color = 0.5 + 0.5 * sin(color);
color = cos(vec3(0.3, 0.24, 0.2) * 8.0 + dist * 4.0) * 0.5 + 0.5;
 	
 vec3 f = c * color2;
      f += c1 * color;
      f += c2 * color2;
      f += s * color;
      
    return f - 0.01;

}


highp vec3 circle2(highp vec2 p, highp float size, highp float decay, highp vec3 color, highp vec3 color2, highp float dist, highp vec2 mouse){

highp vec2 fc = gl_FragCoord.xy;

highp float l = length(p + mouse * (dist * 4.0)) + size / 2.0;
highp float l2 = length(p + mouse * (dist * 4.0)) + size / 3.0;

highp float a = max(00.01 - pow(length(p / fc + mouse * dist * 1.2), size * 1.2), 0.0) * 50.0;

highp float a_1 = max(0.02 - pow(length(p / fc + mouse * dist * 2.4), size * 1.1), 0.0) * 20.0;

highp float a_2 = max(0.02 - pow(length(p / fc + mouse * dist * 1.7), size * 0.9), 0.0) * 50.0;

highp float b_1 = max(0.02 - pow(l - 0.3, 1.0 / 40.0) + sin(l * 30.0), 0.0) * 3.0;

color = 0.5 + 0.5 * sin(color);
color = cos(vec3(0.3, 0.24, 0.2) * 8.0 + dist * 4.0) * 0.5 + 0.5;
 	
 vec3 f = a * color2;
      f += a_1 * color;
      f += a_2 * color2;
      f += b_1 * color;
      
    return f;

}


highp float Draw(highp float x, highp float y){
   return  1.0/sqrt(x*x+y*y);  
}


highp vec3 lensflare(highp vec2 u, highp vec2 pos) {

       highp float intensity = 1.5;
	highp vec2 main = u-pos;
	highp vec2 uvd = u*(length(u));
	
	highp float ang = atan(main.y, main.x);
	highp float dist = length(u);
  dist = pow(dist,0.01);
	highp float n = randz(0.0);
	
	highp float f0 = (1.0/(length(u-12.0)*16.0+1.0)) * 2.0;
	
	f0 = f0*(sin((n*2.0)*12.0)*0.1+dist*0.1+0.8);

	highp float f2 = max(1.0/(1.0+32.0*pow(length(uvd+0.8*pos),2.0)),0.0)*00.25;
	highp float f22 = max(1.0/(1.0+32.0*pow(length(uvd+0.85*pos),2.0)),0.0)*00.23;
	highp float f23 = max(1.0/(1.0+32.0*pow(length(uvd+0.9*pos),2.0)),0.0)*00.21;
	
	highp vec2 uvx = mix(u,uvd,-0.5);
	
	highp float f4 = max(0.01-pow(length(uvx+0.45*pos),2.4),0.0)*6.0;
	highp float f42 = max(0.01-pow(length(uvx+0.5*pos),2.4),0.0)*5.0;
	highp float f43 = max(0.01-pow(length(uvx+0.55*pos),2.4),0.0)*3.0;
	
	uvx = mix(u,uvd,-.4);
	
	highp float f5 = max(0.01-pow(length(uvx+0.3*pos),5.5),0.0)*2.0;
	highp float f52 = max(0.01-pow(length(uvx+0.5*pos),5.5),0.0)*2.0;
	highp float f53 = max(0.01-pow(length(uvx+0.7*pos),5.5),0.0)*2.0;
	
	uvx = mix(u,uvd,-0.5);
	
	highp float f6 = max(0.01-pow(length(uvx+0.1*pos),1.6),0.0)*6.0;
	highp float f62 = max(0.01-pow(length(uvx+0.125*pos),1.6),0.0)*3.0;
	highp float f63 = max(0.01-pow(length(uvx+0.15*pos),1.6),0.0)*5.0;
	
	highp vec3 c = vec3(0.0);
	c.r+=f2+f4+f5+f6; 
  c.g+=f22+f42+f52+f62; 
  c.b+=f23+f43+f53+f63;
	c+=vec3(f0);
	
	return c * intensity;
}


highp vec3 colorflare(vec3 color, float factor, float factor2) {

	float w = color.x+color.y+color.z;
	return mix(color,vec3(w)*factor,w*factor2);
}


highp vec4 SunmoonEffect(vec4 sunmoon, vec4 lens, highp vec3 w_pos) {

vec2 u = -lens.xz*0.1;
vec3 xyz = w_pos*10.0;
float rain = pow(FOG_CONTROL.y,11.0);
float l = FOG_COLOR.r + FOG_COLOR.g + FOG_COLOR.b;
float sun = 1.0 - clamp( dot(xyz,xyz/30.0), 0.0, 1.0 );
float a = atan(w_pos.x, w_pos.z);
float bright = 0.0001;

vec3 c = vec3(1.4, 1.2, 1.0) * lensflare(w_pos.xz, u)*2.0;
c = colorflare(c, 0.5, 0.1) * 0.5;
    
for(float i = 0.0; i < 0.1; i++){

flares += circle(lens.xz, pow(randz(i * 2000.0) * 1.8, 2.0) + 1.41, 0.0, circColor + i , circColor2 + i, randz(i * 20.0) * 3.0 + 0.2 - 0.5, w_pos.xz);

flares += circle2(lens.xz, pow(randz(i * 2000.0) * 1.8, 2.0) + 1.41, 0.0, circColor3 + i , circColor4+ i, randz(i * 20.0) * 3.0 + 0.2 - 0.5, w_pos.xz);

}

flares += 0.1 / pow(length(w_pos.xz) * 3.0, 5.0) * abs(sin(a * 5.0 + cos(a * 9.0))) / 20.0;   
//flares += max(0.1 / pow(length(w_pos.xz) * 10.0, 1.0 / 20.0), 0.0) + abs(sin(a * 3.0 + cos(a * 9.0))) / 8.0 * (abs(sin(a * 9.0))) / 1.0;
flares += (max(bright / pow(length(w_pos.xz) * 4.0, 1.0 / 2.0), 0.0) * 4.0) * 4.0;
flares *= exp(1.0 - length(w_pos.xz)) / 5.0;

sunmoon = vec4(0.0);
sunmoon += 0.2 * mix(vec4(1.1,1.1,1.1,1.0),vec4(2.75,1.5,0.1,0.2),l*0.35) *  pow( sun,4.0 ) * rain;
sunmoon += 0.1 * mix(vec4(1.1,1.1,1.1,1.0),vec4(2.75,1.5,0.1,0.2),l*0.35)    *  pow( sun, 2000.0 ) * rain;
sunmoon += 2.0 * mix(vec4(1.1,1.1,1.1,1.0),vec4(1.5,0.5,0.1,1.0),l*0.35) * Draw(xyz.x*30.0,xyz.z*30.0) * rain;
sunmoon.rgb += mix( c, vec3(0.0), clamp(length(w_pos) / RENDER_DISTANCE * 30.0, 0.0, 1.0));
sunmoon += vec4(flares, 1.0) * rain;

return sunmoon;
}


float filmc(float x) {

float A = 0.22;
float B = 0.3;
float C = 0.15 * 1.70;
float D = 0.4 * 1.30;
float E = 0.01 * 1.47;
float F = 0.2;

return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;

}


vec3 doTSPEmapping(vec3 clr) {
float W = 1.3 / 1.0;

float Luma = dot(clr, vec3(0.0, 0.3, 0.3));
vec3 Chroma = clr - Luma;
clr = (Chroma * 1.70) + Luma;

  clr = vec3(filmc(clr.r), filmc(clr.g), filmc(clr.b)) / filmc(W);


return clr;
}


highp float ShadowSet(vec4 sh_set, float x_sh_f, float f_sh_f){

highp float sh_a =1.0;
if((f_sh_f>=0.0&&f_sh_f<sh_set.x) || (x_sh_f<sh_set.y)){
sh_a=0.0;
}
else if((f_sh_f>=0.0&&f_sh_f<sh_set.z)|| (x_sh_f<sh_set.w)){
sh_a=min((f_sh_f-sh_set.x)*(x_sh_f-sh_set.y)*400.0,1.0);
}
else{
sh_a=1.0;
}
return clamp(sh_a,0.0,1.0);
}


vec4 WaterSky(highp vec3 w_pos,float flag){

flagSet(fnight_f,fsunset_f,frain_f,FOG_COLOR,1.0,1.0);

float sky_a =length(w_pos);
float fog_a =length(-w_pos.xz)/ FAR_CHUNKS_DISTANCE;

vec4 SkyColor = mix(mix(mix(sky_day_color,sky_sunset_color,fsunset_f),sky_night_color,fnight_f),sky_rain_color*CURRENT_COLOR.r,frain_f);

vec4 water_far = mix(mix(mix(vec4(0.35,0.6,0.9,1.0)*0.9,vec4(1.3,1.0,0.5,1.0),fsunset_f),vec4(0.05,0.1,0.2,1.0),fnight_f),vec4(1.1)-vec4(vec3(fnight_f*0.85),0.0),frain_f);

vec4 waterfog_color = mix(mix(mix(vec4(1.0,1.07,1.15,1.0)*0.79,vec4(0.4,0.1,0.0,1.0),fsunset_f),vec4(0.075,0.15,0.3,1.0),fnight_f),vec4(1.2)-vec4(vec3(fnight_f*0.95),0.0),frain_f);

if(flag==1.0){

SkyColor = mix(SkyColor, water_far, pow(clamp(sky_a*1.9,0.0,1.0),1.5));

SkyColor = mix(SkyColor, waterfog_color,pow(clamp(sky_a*1.8,0.0,1.0),1.6));

SkyColor = mix(SkyColor, FOG_COLOR,pow(clamp(sky_a,0.0,1.0),4.5));

}
else{
SkyColor = mix(SkyColor*0.8 , FOG_COLOR, clamp(fog_a*2.0,1.0,0.0));
}

SkyColor.rgb = doTSPEmapping(SkyColor.rgb);

if(unwater(FOG_COLOR,frain_f)){
SkyColor = FOG_COLOR;
}
return SkyColor;
}


highp float hash(highp vec2 p)
{
	p  = fract(p /  vec2(3.07965, 7.1235));
    p += dot(p, p.xy + 19.19);
    return fract(p.x * p.y * p.x);
}


highp float noise(highp vec2 p)
{ 
highp vec2 i = floor(p);
highp float a = hash(i+vec2(0.0,0.0));
highp float b = hash(i+vec2(1.0,0.0));
highp float c = hash(i+vec2(0.0,1.0));
highp float d = hash(i+vec2(1.0,1.0));

highp vec2 f = fract(p);
highp vec2 u = f*(2.0-f);
u *= f*f*f*(f*(f*6.0-15.0)+10.0);

highp float a1 = mix(a,b,u.x);
highp float b1 = mix(c,d,u.x);
return 1.2*mix(a1,b1,u.y);
}


float smoothrend(float den, float alpha){

den *= 2.5;
float c = den - (1.0 - 0.44);
if( c < 0.0 )
{
c = 0.0;
}
den = 1.0 - (pow(0.0015, c));

return den*alpha;
}


float noisemap2d(vec2 p, int depth){

float z = 2.85;
float rz = 0.0;
p *= 0.3;
p += vec2(2.65,0.3)*TIME*0.0015;
for(int i = 0; i < depth; i++)
{
rz += noise(p)/z;
z *= 2.1;
p *= 2.5;
p -= TIME*0.0100*pow(z,0.5)/2.0;
}

return pow(abs(rz),2.3);
}


float density(vec3 pos, int depth, float size){

const mat2 m2 = mat2(0.8,0.6,-0.6,0.8);
pos.xz *= m2/2.0;
vec2 pod = pos.xz*20.0;
float den = 4.0 * noisemap2d(pod*1.3,depth);
float rain = pow(FOG_CONTROL.y,11.0);

return den*size*mix(1.0,0.64,rain);
}


vec4 clouds(highp vec3 w_pos) {

flagSet(fnight_f,fsunset_f,frain_f,FOG_COLOR,1.0,1.0);

vec4 cloud_color =mix(mix(mix(cloud_day_color,cloud_sunset_color,fsunset_f),cloud_night_color,fnight_f),cloud_rain_color*CURRENT_COLOR,frain_f);

cloud_color.rgb = doTSPEmapping(cloud_color.rgb);

if(unwater(FOG_COLOR,frain_f)){
cloud_color.a=0.0;
}
return cloud_color;
}


vec4 CloudsEffect(highp vec3 w_pos) {

float den = smoothrend(density(w_pos,6,1.0),1.0);
float den1 = smoothrend(density(w_pos*0.97,int(5.5),0.95),0.2);
float den2 = smoothrend(density(w_pos*0.955,int(5.4),0.9),0.25);
float den3 = smoothrend(density(w_pos*0.94,int(5.3),0.85),0.3);
float den4 = smoothrend(density(w_pos*0.925,int(5.2),0.8),0.35);
float den5 = smoothrend(density(w_pos*0.91,int(5.1),0.75),0.4);
float den6 = smoothrend(density(w_pos*0.895,int(5.0),0.7),0.45);
float den7 = smoothrend(density(w_pos*0.88,int(4.9),0.65),0.5);
float den8 = smoothrend(density(w_pos*0.865,int(4.8),0.6),0.55);
float den9 = smoothrend(density(w_pos*0.85,int(4.7),0.55),0.6);
float den10 = smoothrend(density(w_pos*0.835,int(4.6),0.5),0.65);

float denA = max(0.0,max(den1,den2));
float denB = max(0.0,max(den3,den4));
float denC = max(0.0,max(den5,den6));
float denD = max(0.0,max(den7,den8));
float denE = max(0.0,max(den9,den10));
float denF = max(0.0,max(denA,denB));
float denG = max(0.0,max(denC,denD));
float denH = max(0.0,max(denE,denF));
float denI = max(0.0,max(denG,denH));
float denJ = max(0.0,max(denH,denI));

float denK = smoothrend(density(vec3(w_pos.xy,w_pos.z*3.0),6,0.45),0.3);

vec4 SkyColor = WaterSky(w_pos,0.0);
vec4 cloud_color = clouds(w_pos);
vec4 CloudsColor = SkyColor;
CloudsColor.rgb = mix(CloudsColor.rgb,cloud_color.rgb-denJ,den);

return CloudsColor;
}


highp float fbm00(highp vec2 p) {

highp mat2 my = mat2(0.8, 0.6, -0.6, 0.8);
highp float f = 0.0;
f += 0.50000 * abs(noise(p) -1.0) * 2.0;
p *= my * 2.02;
f += 0.25000 * abs(noise(p) -1.0) * 2.0;
p *= my * 2.03;
f += 0.12500 * abs(noise(p) -1.0) * 2.0;
p *= my * 2.01;
f += 0.06250 * abs(noise(p) -1.0) * 2.0;
p *= my * 2.04;
f += 0.03125 * abs(noise(p) -1.0) * 2.0;

return f / 0.96875;
}


highp vec3 EndskyEffect(highp vec3 w_pos) {

highp vec2 q = w_pos.xz;
highp vec2 p = 10.0 * q -0.5;
highp float r = length(p);
highp float f = fbm00(p + TIME);
f *= r * 3.0 - 0.5;
f = (1.0 - f);
highp vec3 col = vec3(0.2, 0.3, 0.5) / f;

return col;
}


highp float hash_rain(highp vec2 p) {

highp vec3 p3 = fract(vec3(p.xyx) * HASHSCALE1);
p3 += dot(p3, p3.yxz + 19.19);

return fract((p3.x + p3.y) * p3.z);
}


highp vec2 hash_ripple(highp vec2 p) {

highp vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
p3 += dot(p3, p3.yzx + 19.19);

return fract((p3.xx + p3.yz) * p3.zy);
}



vec3 _smoothstep(in vec3 p)
{
     return p * p * 3.0 - 2.0 * MUL3X(p);
}


vec3 rainbow(in  vec3 ray_dir) { 

    RAINBOW_DIR = normalize(RAINBOW_DIR);   
		
    float theta = degrees(acos(dot(RAINBOW_DIR, ray_dir)));
    vec3 nd = clamp(1.0 - abs((RAINBOW_COLOR_RANGE - theta) * 0.2), 0.0, 1.0);
    vec3 color = _smoothstep(nd) * RAINBOW_INTENSITY;
    
    return color * max((RAINBOW_BRIGHTNESS - 0.75) * 1.5, 0.0);
}


void rainbowSetup() {

    const vec3 up = vec3(0.0, 1.0, 0.0);

    rainbow_pos =  RAINBOW_POS;
    rainbow_w   = -normalize(-rainbow_pos);
    rainbow_up  =  normalize(cross(rainbow_w, up));
    rainbow_vertical = normalize(cross(rainbow_up, rainbow_w));
}


vec3 rainbowColor(highp vec3 w_pos) {

     vec2 uv = w_pos.zz;
     vec2 p = (1.2 + 2.0 * uv);

     vec3 color = vec3(0.0);
     if (p.y >= RAINBOW_START_Y)
     {
	
    	 rainbowSetup();

     	 vec3 dir = normalize(vec3(p, 0.0) - vec3(0.0, 0.0, -1.5));

     	 vec3 wdDir = normalize(dir.x * rainbow_up + dir.y * rainbow_vertical - dir.z * rainbow_w);
	     
         color += rainbow(wdDir);
     }	
     return clamp(color, 0.0, 1.0);  
}


highp mat2 mm_2(in highp float a){
highp float c = cos(a), s = sin(a);
return mat2(c,s,-s,c);
}


highp float tri(in highp float x){
return clamp(abs(fract(x)-.5),0.01,0.49);
}


highp vec2 tri2(in highp vec2 p){
return vec2(tri(p.x)+tri(p.y),tri(p.y+tri(p.x)));
}


highp float triNoise2d(in highp vec2 p, highp float spd)
{

    highp mat2 m_2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

    highp float z=1.8;
    highp float z2=2.5;
	highp float rz = 0.;
    p *= mm_2(p.x*0.06);
    highp vec2 bp = p;
	for (float i=0.0; i<5.0; i++ )
	{
        highp vec2 dg = tri2(bp*1.85)*.75;
        dg *= mm_2(TIME*spd);
        p -= dg/z2;

        bp *= 1.3;
        z2 *= .45;
        z *= .42;
		p *= 1.21 + (rz-1.0)*.02;
        
        rz += tri(p.x+tri(p.y))*z;
        p*= -m_2;
	}
    return clamp(1./pow(rz*29., 1.3),0.,.55);
}


highp vec4 aurora( highp vec3 ro, highp vec3 rd) {
    highp vec4 col = vec4(0);
    highp vec4 avgCol = vec4(0);    

    for (float i=0.; i < 10.; i++) {
        highp float of = 0.006*hash(ro.xy)*smoothstep(0.,15., i);
        highp float pt = ((.8+pow(i,1.4)*.002)) / (rd.y * 2. + 0.4);
        pt -= of;
    	highp vec3 bpos = 5.5 + pt * rd;
        highp vec2 p = bpos.zx;
        highp float rzt = triNoise2d(p, 0.06);
        highp vec4 col2 = vec4(0,0,0, rzt);
        col2.rgb = (sin(1.-vec3(2.15,-.5, 1.2) +i * 0.043) * 0.5 + 0.5)*rzt;
        avgCol = mix(avgCol, col2, .5);
        col += avgCol * exp2(-i*0.065 - 2.5) * smoothstep(0., 5., i);
    }
    col *= (clamp(rd.y*15.+.4,0.,1.));
 
    return smoothstep(0.,1.1,pow(col,vec4(1.))*1.5);
}


void setSkyColor(vec2 uv, out vec3 color_, vec3 dir) {
   color_ = aurora(dir, dir).rgb;
}


float meteor(vec2 p){
  vec2 v = vec2(PI_METEOR*1453.0,exp(1.)*3054.0);
  return fract(sin(dot(p,v)*0.1)*4323.0);
}


vec3 getColor(float c){
   float r = cos((c-0.75)*PI_METEOR);
   float g = cos((c-0.55)*PI_METEOR);
   float b = cos((c-0.25)*PI_METEOR);
   return vec3(r,g,b);
}


void drawMeteor(inout highp vec3 col, in highp vec2 uv, highp vec2 startP, highp vec2 endP, highp float linWidth){
 
   uv*=3.0;
   highp vec2 lineDir=endP-startP;
   highp vec2 fragDir=uv-startP;
   

  highp float lineCoe=clamp(dot(lineDir,fragDir)/dot(lineDir,lineDir),0.,1.0);
                       
   highp vec2 projDir=lineCoe*lineDir;
    
   highp vec2 fragToLineDir= fragDir- projDir;
    
   highp float dis=length(fragToLineDir);
   highp float disToTail = length(projDir);
   dis=linWidth/dis;
     
   col += dis*getColor(0.3)*pow(disToTail,3.0);
    
}

 
void drawMeteors(inout highp vec3 col, highp vec2 uv){
    
    highp vec2 dir = normalize(vec2(-1.0,-0.5));
    highp vec2 mv  = -dir*cos(mod(TIME*1.0,PI_METEOR))*60.0;
    highp vec2 sp  = vec2(10.0+100.0*meteor(vec2(floor(TIME*5.0/PI_METEOR))),10.0);
    highp vec2 ep  = sp+dir*5.0;

    drawMeteor(col,uv,sp+mv,ep+mv,0.0005);

}


void drawStars(inout vec3 col,vec2 uv,vec2 c){
   uv-=c;
    
   uv*=2.8;
   
   float l =length(uv);
   float arc = atan(uv.y,uv.x); 
     
   float d = abs(dot(vec2(0,1),uv));
   float d1 = abs(dot(vec2(1,0),uv));
   float ctv = c.x*10.0;

   d+=pow(l,1.1+0.6*cos(TIME*2.0+ctv));
   d1+=pow(l,1.1+0.6*cos(TIME*2.0+ctv));
   
   float v =0.0005/l;  

   v+=0.01/(d);
   v+=0.01/(d1);
   v=pow(v,1.6);
    
   col+=vec3(cos(TIME+ctv)*0.1+0.5,sin(TIME+ctv)*0.4+0.5,sin(TIME)*0.3+0.7)*v;
}


void drawStarGroup(inout vec3 col,vec2 uv,float starNum){
    for (float i=0.0;i<20.0;i++){
        drawStars(col,uv,vec2(i*0.1*sin(i),cos(i)*0.3));
    }
}


vec3 meteorColor(highp vec3 w_pos) {

    vec2 p = w_pos.xz*4.0;
    vec3 meteor = vec3(0.0);
    vec2 cuv = p - vec2(0.5);
    cuv *=10.;   
    drawMeteors(meteor,cuv);

return meteor;
}


vec3 starsColor(highp vec3 w_pos) {

     vec2 u = w_pos.xz*5.0;
     vec3 stars = vec3(0.0);
     drawStarGroup(stars,u,16.0); 

return stars;
}


vec3 auroraColor(highp vec3 w_pos) {

     vec2 uv = w_pos.xz*5.0;
     vec3 aurora_color = vec3(0.0);
     vec3 eye = normalize(vec3(uv.x,2.0,uv.y));
     setSkyColor(uv, aurora_color, eye);

return aurora_color;
}



float randf( vec2 p){ 
	return fract(cos(dot(p,vec2(7667.,156.))) * 7365.552);
}



highp vec4 SkyCos(vec4 ccolor,highp vec3 w_pos) {

float rain = (1.0-clamp(3.34*(FOG_CONTROL.y-0.7),0.,1.));

float day = clamp((ccolor.b-0.15)*1.1764706,0.,1.);

float night = 1.-day;

float sun = 0.5-abs(0.5-day);

float look_sun = (1.-FOG_COLOR.b)*clamp((FOG_COLOR.r-0.15)*1.25,0.,1.);


vec3 cday = mix(vec3(0.1,0.25,0.6), vec3(0.1,0.4,0.8), max(pow(length(w_pos.xz*6.),2.5),0.)*0.5 );
   cday = mix(cday, vec3(1.), clamp(pow(length(w_pos.xz*2.3),1.5),0.,1.) );

vec3 cnight = mix(vec3(0.01,0.,0.05), vec3(0.12,0.216,0.48), max(pow(length(w_pos.xz*4.5),2.5),0.)*0.5 );

   cnight = mix(cnight, vec3(0.13), clamp(pow(length(w_pos.xz*2.3),1.5),0.,1.) );

vec3 csun = mix(vec3(0.01,0.05,0.2), vec3(0.0,0.08,0.2), max(pow(length(w_pos.xz*4.5),2.5),0.)*0.5 );
   csun = mix(csun, vec3(0.2), clamp(pow(length(w_pos.xz*2.3),1.5),0.,1.) );
   csun = mix(csun, vec3(0.3), clamp(pow(length(w_pos.xz*2.3),1.5),0.,1.) );

vec3 clook_sun = mix(vec3(0.0,0.3,0.6), vec3(0.1,0.5,0.7), clamp(pow(length(w_pos.xz*4.5),1.5),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.7,0.7,0.7), clamp(pow(length(w_pos.xz*2.5),1.8),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.7,0.7,0.3), clamp(pow(length(w_pos.xz*2.19),2.),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.8,0.6,0.), clamp(pow(length(w_pos.xz*2.13),2.),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.7,0.35,0.), clamp(pow(length(w_pos.xz*2.08),2.2),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.5,0.0,0.), clamp(pow(length(w_pos.xz*2.04),2.3),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.2,0.0,0.), clamp(pow(length(w_pos.xz*2.2),2.5),0.,1.) );
   clook_sun = mix(clook_sun, vec3(0.56), 0.45);

vec3 crain = mix(ccolor.rgb*1.,ccolor.rgb*0.85, clamp(pow(length(w_pos.xz*4.),1.5),0.,1.) );
   crain = mix(crain, FOG_COLOR.rgb, clamp(pow(length(w_pos.xz*2.),1.),0.,1.) );
   crain = mix(crain, FOG_COLOR.rgb, clamp(pow(length(w_pos.xz*1.),1.),0.,1.) );

vec3 daycycle = mix(cday,cnight,night);

   daycycle = mix(daycycle,csun,sun);

   daycycle = mix(daycycle,clook_sun,min(look_sun*1.5,1.));

   daycycle = mix(daycycle,crain,rain);


	vec4 Sky_FragColor = vec4(daycycle,1.)+ 0.02*pow( randf( 50.*sin(w_pos.xz+fract(TIME*0.0000004)) ), 1.);


return Sky_FragColor;
}


highp vec4 SkyEffect(vec4 ccolor,vec4 color,highp vec3 w_pos,float flag){

flagSet(fnight_f,fsunset_f,frain_f,FOG_COLOR,1.0,1.0);

float night = smoothstep(0.4,0.2,color.b);
float rain = pow(FOG_CONTROL.y,11.0);
float sky_a = length(w_pos);

//vec4 SkyColor = WaterSky(w_pos,flag);
vec4 SkyColor = SkyCos(ccolor,w_pos);
vec4 cloudsEffect = CloudsEffect(w_pos)*(1.0 - night);
vec3 auroraEffect = auroraColor(w_pos);
vec3 meteorEffect = meteorColor(w_pos)*night*rain;
vec3 rainbowEffect = rainbowColor(w_pos)*frain_f;
vec3 starsEffect = starsColor(w_pos)*night*rain;

if(flag==1.0){
SkyColor.rgb += auroraEffect*night*rain;
   SkyColor.rgb += meteorEffect*night*rain;
      SkyColor.rgb += rainbowEffect*frain_f;
         SkyColor.rgb += starsEffect*night*rain;
}

SkyColor = mix(SkyColor, vec4(cloudsEffect.rgb,1.0),  clamp(cloudsEffect.a*1.5,0.0,1.0)*max(1.0-sky_a*1.5,0.0));

return SkyColor;
}


highp float waterPos(highp vec3 v1, highp vec3 v2){
 return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z) / length(v1) / length(v2);
}


highp float getWaves(highp vec3 pos){
pos.z += TIME * 0.35;
highp vec2 np = vec2(pos.z, pos.x-pos.z);
 highp float wave1 = noise(vec2(pos.x*0.2 + pos.z *0.2 + pos.y*0.3 + pos.x*0.2, pos.z*0.3 + pos.x*0.2 + pos.z*0.4));
 highp float wave2 = sin(wave1) * 2.5 + 0.5;
highp float w0 = noise(np);
 return mix(wave1, wave2, w0);
}


highp float waterWaves(highp vec3 w_pos,highp vec3 v_pos){
 highp float value = (getWaves(w_pos.zyx*vec3(0.5, 3.0, -1.0)+TIME*0.1)*getWaves(w_pos.zyx*vec3(0.3, 4.0, 0.8)+TIME*0.2)) * 7.5;
 highp vec3 frag_water_normal = vec3(-value, 0.0, 1.0);
const vec3 origin_water_normal = vec3(0.0, 1.0, 0.0);
highp vec3 water_normal = mix(frag_water_normal, origin_water_normal, min(1.0, length(v_pos.xz) / max(50.0, abs(v_pos.y) * 4.0)));
highp float view_angle = acos(abs(waterPos(v_pos, water_normal)));
 highp float waves =pow(view_angle*0.6, 1.0);

 return waves;
}


highp vec4 sunmoonReflect(vec3 v_pos, float light_f, float rex_c){

flagSet(night_f,sunset_f,rain_f,vec4(light_f),1.0,0.0);

vec3 rex_color =mix(sun_color.rgb+FOG_COLOR.rgb*2.5,moon_color.rgb+FOG_COLOR.rgb,night_f);
vec3 move_pos =mix(vec3(-80.0,0.0,0.0),vec3(-32.0,0.0,0.0),sunset_f-night_f);
vec3 side_pos =mix(vec3(2.0,1.0,4.0),vec3(0.2,1.0,1.1),sunset_f-night_f);
vec3 rex_pos =-v_pos*side_pos+move_pos;

float rex_a =clamp(1.2-(length(vec3(rex_pos.xz,pow(rex_pos.y,0.8)))/ FAR_CHUNKS_DISTANCE),0.0,1.0);
float rex_a0 = pow(clamp(rex_a,0.0,1.0),rex_c+sunset_f*3.0)*(1.0-rain_f);

return vec4(rex_color,rex_a0);
}


vec3 WaterRainbow(float hue, float saturation, float value)
{
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(hue) + t.xyz) * 6.0 - vec3(t.w));

    return value * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), saturation);
}


highp vec4 waterEffect(vec4 color,highp vec3 w_pos, vec3 v_pos, float light_f, float f_sh_f, float lights_f,float flag){

flagSet(night_f,sunset_f,rain_f,vec4(light_f),1.0,0.0);

float fog_f =length(-v_pos)/ FAR_CHUNKS_DISTANCE;
float water_f =length(-v_pos.xz)/ FAR_CHUNKS_DISTANCE;
float water_w = waterWaves(w_pos*2.0,v_pos);

vec3 water_rainbow = WaterRainbow((v_pos.z * 0.3) - 0.0, RAINBOW_WATER_SATURATION, RAINBOW_WATER_LIGHTNESS*pow(water_w*2.0,1.0));

vec4 cloudsEffect = CloudsEffect(v_pos/30.0*pow(water_w*2.0,1.0)*(1.0-night_f));
vec3 meteorEffect = meteorColor(v_pos/50.0*pow(water_w*2.0,1.0)*night_f);
vec3 auroraEffect = auroraColor(v_pos/30.0*pow(water_w*2.0,1.0)*night_f);
vec3 starsEffect = starsColor(w_pos / 50.0*pow(water_w*2.0,1.0)*night_f);

vec4 light_color = lights_color*lights_f*pow(water_w,2.0);
vec4 srex_color = sunmoonReflect(v_pos*pow(water_w*2.0,3.0),light_f,2.0);
vec4 SkyColor = WaterSky(v_pos*pow(water_w*2.0,1.0),flag);
vec4 water_color = mix(SkyColor,cloudsEffect*(1.0-night_f),pow(water_w,1.0)*f_sh_f*clamp(fog_f+0.5,0.0,0.8));//pow(clamp(1.0-fog_f*2.0,0.0,1.0),2.0));

water_color.rgb += water_rainbow*rain_f;
//water_color.rgb += starsEffect*night_f;
water_color.rgb += meteorEffect*night_f*(1.0-rain_f);
water_color.rgb += auroraEffect*night_f*(1.0-rain_f);
water_color = mix(water_color,srex_color,clamp(pow(srex_color.a,5.0)*f_sh_f,0.0,1.0))+light_color;
water_color.a += pow(water_f,3.0);

return water_color;
}


mat2 rot2D(highp float a) {
  a = radians(a);
  highp float s = sin(a);
  highp float c = cos(a);
  return mat2(c, s, -s, c);
}


mat3 lookat(highp vec3 fw, highp vec3 up) {
  fw = normalize(fw);
  highp vec3 rt = normalize(cross(fw, normalize(up)));
  return mat3(rt, cross(rt, fw), fw);
}


highp float fmod(highp float p, highp float c) { 
return abs(c - mod(p, c * 2.)) / c; 
}


highp float smin(highp float a, highp float b, highp float k) {
  highp float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}


highp float smax(highp float a, highp float b, highp float k) {
  highp float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}


highp float fractal(highp vec3 p, highp float time) {
  p += cos(p.z * 3. + time * 4.) * .02;
  highp  float depth = smoothstep(0., 6., -p.z + 5.);
  p *= .3;
  p = abs(2. - mod(p + vec3(0.4, 0.7, time * .07), 4.));
  highp float ls = 0.;
  highp float c = 0.;
  for (int i = 0; i < 6; i++) {
    p = abs(p) / min(dot(p, p), 1.) - .9;
    highp float l = length(p);
    c += abs(l - ls);
    ls = l;
  }
  return smoothstep(0., 50., c) * depth * 4.;
}


highp vec3 march(highp vec3 from, highp vec3 dir, highp vec3 dir_light, highp float time) {

  highp vec3 col_water = vec3(0.3, 0.7, 1.0);
  highp vec3 odir = dir;
  highp vec3 p = from + dir * 2.0;
  highp float fg = fractal(p + dir, time) * 0.55;
  highp vec3 col = vec3(0.0);
  highp float totdist = 0.0;
  highp float d;
  highp float v = 0.0;
  highp float maxdist = 5.0;
  highp float det = 0.001;
  
  highp float fade = smoothstep(maxdist * .2, maxdist * .9, maxdist - totdist);
  highp float ref = 1.;
  if (d < det * 2.) {
    p -= (det - d) * dir;
    col = mix(col_water * .15, col, fade);
  }
  col *= normalize(col_water + 1.5) * 1.7;
  p = maxdist * dir;
  highp vec3 bk = fractal(p, time) * ref * col_water;
  highp float glow = pow(max(0., dot(dir, -dir_light)), 1.5);
  highp vec3 glow_water = normalize(col_water+1.);
  bk += glow_water*(glow+ pow(glow, 8.) * 1.5) * ref;
  col += v * .06 * glow * ref * glow_water;
  col += bk + fg * col_water;
  return col;
}


highp vec3 UnwaterRender(highp vec3 w_pos, vec3 v_pos) {

highp float time_wave = TIME * 0.5 + 23.0;
highp float time_bubble = mod(TIME, 600.0);
highp vec2 uv_water = w_pos.xz / 10.0;
highp vec2 uv_bubble = v_pos.xz / 20.0;

highp vec3 dir_light = normalize(vec3(-.3, 0.2, 1.));
highp vec3 dir = normalize(vec3(uv_bubble, .9));
highp vec3 from = vec3(1., 0., -0.5 + uv_bubble.y) * 1.25;
from.xy *= rot2D(-uv_bubble.x * 40.);
dir = lookat(normalize(-from+vec3(sin(time_bubble * 0.5) * 0.3,cos(time_bubble * 0.25) * 0.1,0.0)), vec3(0.0, 0.0, -1.0)) * dir;

highp vec3 BubbleEffect = march(from, dir, dir_light, time_bubble);
BubbleEffect *= vec3(1.1, 0.9, 0.8);

#ifdef SHOW_TILING
highp vec2 p6 = mod(uv_water * TAU * 2.0, TAU) - 250.0;
#else
highp vec2 p6 = mod(uv_water * TAU, TAU) - 250.0;
#endif

highp vec2 k = vec2(p6);
highp float c = 1.0;
highp float inten = 0.005;

for (int n = 0; n < MAX_ITER; n++) {

highp float v = time_wave * (1.0 -(3.5 / float(n + 1)));
k = p6 + vec2(cos(v - k.x) + sin(v + k.y), sin(v - k.y) + cos(v + k.x));
c += 1.0 / length(vec2(p6.x / (sin(k.x + v) / inten), p6.y / (cos(k.y + v) / inten)));
}
c /= float(MAX_ITER);
c = 1.17 - pow(c, 1.4);

highp vec3 UnWaves  = vec3(pow(abs(c), 8.0));
UnWaves = clamp(UnWaves + vec3(0.0, 0.35, 0.5), 0.0, 1.0);
UnWaves += BubbleEffect;

return UnWaves;
}


vec4 entityRender(vec4 diffuse,vec4 color,vec4 light_f,highp vec3 w_pos,vec3 v_pos,float L,float flag){

flagSet(night_f,sunset_f,rain_f,vec4(light_f),1.0,0.0);

flagSet(fnight_f,fsunset_f,frain_f,FOG_COLOR,1.0,1.0);

float x_sh_f = L*TILE_LIGHT_COLOR.r;
float f_sh_f = TILE_LIGHT_COLOR.r;
float fog_f =length(-v_pos)/FAR_CHUNKS_DISTANCE;

vec4 sh_set =mix(mix(mix(vec4(0.85,0.95,1.0,1.3)*1.0,vec4(0.85,0.95,1.0,1.3)*0.38,sunset_f),vec4(0.85,0.95,0.88,0.98)*0.25,night_f),vec4(0.2,0.0,0.2,0.0),pow(1.0-TILE_LIGHT_COLOR.r,5.0));

#ifdef ITEM_IN_HAND
sh_set =vec4(0.95,0.95,1.12,1.12)*1.05;
x_sh_f=L;
f_sh_f=L;
#endif

sunset_color=mix(sunset_color,dark_sh_color+f_sh_f*day_color*vec4(0.54,0.55,0.60,1.0)*shadow_color*0.6,clamp(FOG_COLOR.b+0.2,1.0,0.0));

vec4 wlight_color =mix(mix(mix(day_color,sunset_color,sunset_f),night_color,night_f),rain_color-vec4(vec3(night_f*0.15),0.0),rain_f)*0.8;
vec4 sh_color = dark_sh_color+f_sh_f*wlight_color*vec4(0.714,0.729,0.787,1.0)*shadow_color;
vec4 nnfog_color =mix(mix(mix(vec4(1.0,1.07,1.15,1.0)*0.79,FOG_COLOR,sunset_f),vec4(0.05,0.1,0.2,1.0),night_f),vec4(0.75)-vec4(vec3(night_f*0.6),0.0),rain_f);
vec3 nfog_color =mix(vec3(0.65,0.65,1.0)*FOG_COLOR.rgb,vec3(0.8)-vec3(night_f*0.75),frain_f);

float nfog_a = clamp(pow(fog_f*(0.3+frain_f*0.7),1.0-frain_f*0.3)+pow(fog_f*frain_f,1.0-frain_f*0.3),0.0,0.7+frain_f*0.2);

if(ender(FOG_COLOR)){
//light
if(flag==0.0){
sh_set =vec4(0.0,0.0,0.0,0.70);
}
else if(flag==1.0){
sh_set =vec4(0.0,0.95,0.0,1.0);
}
wlight_color=ender_color;
sh_color = ender_color*0.8;
lights_color = ender_lights_color;
//fog
nfog_color = FOG_COLOR.rgb;
nnfog_color.rgb =FOG_COLOR.rgb;

}//ender

if(unwater(FOG_COLOR,rain_f)){
//light

sh_set =vec4(0.0);
vec4 uw_color =vec4(wlight_color.rgb,0.0);
float waterw =pow(getWaves(w_pos.xzy),4.0);

diffuse *= vec4(UnwaterRender(w_pos, v_pos), 1.0);

if(flag==0.0){
#ifdef BLEND
#else

wlight_color=mix(uw_color,un_water_color*uw_color*2.0,clamp(pow(fog_f,1.0),0.0,1.0))+waterw*(f_sh_f+0.1)*uw_color;

sh_color = mix(uw_color*2.5,FOG_COLOR*4.0,clamp(pow(fog_f+0.2,2.0),0.0,1.0))*0.7+waterw*(f_sh_f+0.1)*uw_color;

#endif

}
else if(flag==1.0){

wlight_color=mix(uw_color,un_water_color*uw_color*2.0,clamp(pow(fog_f,1.0),0.0,1.0));

sh_color = mix(uw_color*2.5,FOG_COLOR*4.0,clamp(pow(fog_f+0.2,2.0),0.0,1.0))*0.7;

}

lights_color = unwater_lights_color;
//fog
nfog_color = FOG_COLOR.rgb;
nnfog_color.rgb =FOG_COLOR.rgb;
nfog_a =0.0;

}//unwater

if(nether(FOG_COLOR)){//nether
//light
if(flag==0.0){
sh_set =vec4(0.0,0.0,0.0,0.65);
}
else if(flag==1.0){
sh_set =vec4(0.0,0.8,0.0,1.0);
}
wlight_color=nether_color;
sh_color = nether_color*0.8;
lights_color = nether_lights_color;
//fog
nfog_color = vec3(0.4,0.15,0.0);
nfog_a =max(fog_f-0.7,0.0)*0.85;
nnfog_color.rgb =FOG_COLOR.rgb;

}//nether

float sh_a = ShadowSet(sh_set,x_sh_f,f_sh_f);

vec4 world_light = mix(sh_color,wlight_color,sh_a);

diffuse *= vec4(world_light.rgb,1.0);
diffuse.rgb+=world_light.rgb*world_light.a;
diffuse.rgb =mix(diffuse.rgb,nfog_color,nfog_a);
diffuse.rgb = doTSPEmapping(diffuse.rgb);

return diffuse;
}


vec4 DLight(sampler2D tex, vec2 uv, vec3 pos){
float itenHold = 0.0;
if(TILE_LIGHT_COLOR.x>=1.){
itenHold = 1.0/pow(length(pos),0.5);
itenHold *= max(0.0,(1.0-pow(length(pos),2.0)/RENDER_DISTANCE));
itenHold *= (1.0-uv.x*1.5);
}

itenHold = (itenHold+uv.x);

return texture2D(tex,vec2(itenHold,uv.y));
}


float inrect(vec2 pos, float x1, float y1, float x2, float y2, float focus){
 return min(1.0, max(min(min(pos.x - x1, x2 - pos.x), min(pos.y - y1, y2 - pos.y)), 0.0) / focus);
}


float playershadow(highp vec3 w_pos, vec3 v_pos){
vec3 lookvector = v_pos;
lookvector.x*=2.0;
 vec3 pos = lookvector + vec3(0.4, 0.4, 0.4); 
 vec3 dir = vec3(-1.0, (1.25) * 0.31, 0.0);
 float factor = 1.0;
 if (pos.x < 0.2){
  factor = max(0.0, pos.x / 0.4 + 0.5);
 }
pos += dir * pos.x;
 float focus = .04;
 float footwalk = sin((w_pos.x - lookvector.x) * 2.0 + (w_pos.z - lookvector.z) * 2.0);
float handswalk = sin((w_pos.x - lookvector.x) * 2.0 + (w_pos.z - lookvector.z)) * .5;
pos.yz -= vec2(.2, .4);
 float body = max(inrect(pos.yz, -1.5 + footwalk*.4, -0.25, 0.75, .1, focus), inrect(pos.yz, -1.5 - footwalk*.4, -.1, 0.75, 0.25, focus));
 float hands = max(inrect(pos.yz, -0.5 + footwalk * .1, -0.5, 0.25, .1, focus), inrect(pos.yz, -0.5 - footwalk * 0.1, -.1, 0.25, 0.5, focus));
 return min(1.0, max(body, hands)) * factor;
}

