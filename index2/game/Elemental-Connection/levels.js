'use_strict';

var levels = [
	{
		sources: [
			{element: 'fire', x:250, y:300}
		],
		drains: [
			{element: 'fire', x:550, y:300}
		],
		converters: [],
		obstacles: []
	},
	{
		sources: [
			{element: 'fire', x:250, y:300}
		],
		drains: [
			{element: 'fire', x:550, y:300}
		],
		converters: [],
		obstacles: [
			{element: 'wall', A:{x:390, y:100}, B:{x:410, y:500}}
		]
	},
	{
		sources: [
			{element: 'fire', x:50, y:50}
		],
		drains: [
			{element: 'fire', x:750, y:550}
		],
		converters: [],
		obstacles: [
			{element: 'wall', A:{x:100, y:0}, B:{x:120, y:360}},
			{element: 'wall', A:{x:100, y:400}, B:{x:120, y:600}},
			{element: 'wall', A:{x:119, y:360}, B:{x:300, y:340}},
			{element: 'wall', A:{x:119, y:400}, B:{x:200, y:420}},
			{element: 'wall', A:{x:260, y:400}, B:{x:481, y:420}},
			{element: 'wall', A:{x:480, y:570}, B:{x:500, y:300}},
			{element: 'wall', A:{x:480, y:280}, B:{x:500, y:0}},
			{element: 'wall', A:{x:330, y:360}, B:{x:481, y:340}},
			{element: 'wall', A:{x:330, y:359}, B:{x:350, y:150}},
			{element: 'wall', A:{x:119, y:550}, B:{x:481, y:570}},
			{element: 'wall', A:{x:330, y:0}, B:{x:350, y:91}},
			{element: 'wall', A:{x:170, y:90}, B:{x:430, y:110}},
			{element: 'wall', A:{x:530, y:50}, B:{x:550, y:550}},
			{element: 'wall', A:{x:580, y:0}, B:{x:600, y:80}},
			{element: 'wall', A:{x:580, y:90}, B:{x:600, y:600}},
			{element: 'wall', A:{x:599, y:90}, B:{x:690, y:110}},
			{element: 'wall', A:{x:740, y:90}, B:{x:800, y:110}},
			{element: 'wall', A:{x:650, y:190}, B:{x:800, y:210}},
			{element: 'wall', A:{x:599, y:280}, B:{x:760, y:300}},
			{element: 'wall', A:{x:599, y:420}, B:{x:610, y:440}},
			{element: 'wall', A:{x:679, y:420}, B:{x:800, y:440}},
			{element: 'wall', A:{x:660, y:330}, B:{x:680, y:560}},
			{element: 'wall', A:{x:740, y:299}, B:{x:760, y:400}}
		]
	},
	{
		sources: [
			{element: 'fire', x:250, y:200},
			{element: 'water', x:250, y:400}
		],
		drains: [
			{element: 'fire', x:550, y:200},
			{element: 'water', x:550, y:400}
		],
		converters: [],
		obstacles: [],
	},
	{
		sources: [
			{element: 'fire', x:400, y:100},
			{element: 'water', x:200, y:300}
		],
		drains: [
			{element: 'fire', x:400, y:500},
			{element: 'water', x:600, y:300}
		],
		converters: [],
		obstacles: [
			{element: 'wall', A:{x:150, y:250}, B:{x:370, y:270}},
			{element: 'wall', A:{x:150, y:330}, B:{x:370, y:350}},
			{element: 'wall', A:{x:430, y:250}, B:{x:650, y:270}},
			{element: 'wall', A:{x:430, y:330}, B:{x:650, y:350}},

			{element: 'wall', A:{x:350, y:50}, B:{x:370, y:251}},
			{element: 'wall', A:{x:430, y:50}, B:{x:450, y:251}},
			{element: 'wall', A:{x:350, y:349}, B:{x:370, y:550}},
			{element: 'wall', A:{x:430, y:349}, B:{x:450, y:550}},
		],
	},
	{
		sources: [
			{element: 'fire', x:200, y:200},
			{element: 'water', x:200, y:400}
		],
		drains: [
			{element: 'fire', x:600, y:200},
			{element: 'water', x:600, y:400}
		],
		converters: [],
		obstacles: [
			{element: 'water', A:{x:390, y:200}, B:{x:410, y:0}},
			{element: 'wall', A:{x:390, y:200}, B:{x:410, y:400}},
			{element: 'fire', A:{x:390, y:600}, B:{x:410, y:400}}
		],
	},
	{
		sources: [
			{element: 'fire', x:200, y:200},
			{element: 'water', x:200, y:400}
		],
		drains: [
			{element: 'fire', x:600, y:200},
			{element: 'water', x:600, y:400}
		],
		converters: [],
		obstacles: [
			{element: 'water', A:{x:0, y:100}, B:{x:390, y:120}},
			{element: 'wall', A:{x:390, y:100}, B:{x:410, y:500}},
			{element: 'fire', A:{x:0, y:480}, B:{x:390, y:500}},

			{element: 'wall', A:{x:730, y:100}, B:{x:410, y:120}},
			{element: 'water', A:{x:730, y:100}, B:{x:750, y:300}},
			{element: 'fire', A:{x:730, y:300}, B:{x:750, y:500}},
			{element: 'wall', A:{x:730, y:480}, B:{x:410, y:500}}
		],
	},
	{
		sources: [
			{element: 'fire', x:50, y:200},
			{element: 'water', x:50, y:400}
		],
		drains: [
			{element: 'fire', x:750, y:200},
			{element: 'water', x:750, y:400}
		],
		converters: [],
		obstacles: [
			{element: 'water', A:{x:100, y:0}, B:{x:120, y:100}},
			{element: 'fire', A:{x:100, y:100}, B:{x:120, y:200}},
			{element: 'water', A:{x:100, y:200}, B:{x:120, y:300}},
			{element: 'fire', A:{x:100, y:300}, B:{x:120, y:400}},
			{element: 'water', A:{x:100, y:400}, B:{x:120, y:500}},
			{element: 'fire', A:{x:100, y:500}, B:{x:120, y:600}},

			{element: 'wall', A:{x:120, y:90}, B:{x:220, y:110}},
			{element: 'wall', A:{x:300, y:90}, B:{x:400, y:110}},
			{element: 'wall', A:{x:120, y:190}, B:{x:400, y:210}},
			{element: 'wall', A:{x:120, y:290}, B:{x:220, y:310}},
			{element: 'wall', A:{x:300, y:290}, B:{x:400, y:310}},
			{element: 'wall', A:{x:120, y:390}, B:{x:400, y:410}},
			{element: 'wall', A:{x:120, y:490}, B:{x:220, y:510}},			
			{element: 'wall', A:{x:300, y:490}, B:{x:400, y:510}},

			{element: 'water', A:{x:400, y:0}, B:{x:420, y:300}},
			{element: 'fire', A:{x:400, y:300}, B:{x:420, y:600}},

			{element: 'wall', A:{x:420, y:90}, B:{x:680, y:110}},
			{element: 'wall', A:{x:420, y:190}, B:{x:510, y:210}},
			{element: 'wall', A:{x:590, y:190}, B:{x:680, y:210}},
			{element: 'wall', A:{x:420, y:290}, B:{x:680, y:310}},
			{element: 'wall', A:{x:420, y:390}, B:{x:510, y:410}},
			{element: 'wall', A:{x:590, y:390}, B:{x:680, y:410}},		
			{element: 'wall', A:{x:420, y:490}, B:{x:680, y:510}},

			{element: 'fire', A:{x:680, y:0}, B:{x:700, y:100}},
			{element: 'water', A:{x:680, y:100}, B:{x:700, y:200}},
			{element: 'fire', A:{x:680, y:200}, B:{x:700, y:300}},
			{element: 'water', A:{x:680, y:300}, B:{x:700, y:400}},
			{element: 'fire', A:{x:680, y:400}, B:{x:700, y:500}},
			{element: 'water', A:{x:680, y:500}, B:{x:700, y:600}}
		],
	},
	{
		sources: [
			{element: 'earth', x:250, y:100},
			{element: 'fire', x:400, y:100},
			{element: 'air', x:550, y:100},
			{element: 'water', x:100, y:300}
		],
		drains: [
			{element: 'earth', x:250, y:500},
			{element: 'fire', x:400, y:500},
			{element: 'air', x:550, y:500},
			{element: 'water', x:700, y:300}
		],
		converters: [],
		obstacles: [
			{element: 'wall', A:{x:50, y:250}, B:{x:220, y:270}},
			{element: 'wall', A:{x:50, y:330}, B:{x:220, y:350}},

			{element: 'wall', A:{x:280, y:250}, B:{x:370, y:270}},
			{element: 'wall', A:{x:280, y:330}, B:{x:370, y:350}},
			
			{element: 'wall', A:{x:430, y:250}, B:{x:520, y:270}},
			{element: 'wall', A:{x:430, y:330}, B:{x:520, y:350}},

			{element: 'wall', A:{x:580, y:250}, B:{x:750, y:270}},
			{element: 'wall', A:{x:580, y:330}, B:{x:750, y:350}},

			
			{element: 'wall', A:{x:200, y:50}, B:{x:220, y:251}},
			{element: 'wall', A:{x:280, y:50}, B:{x:300, y:251}},
			{element: 'wall', A:{x:200, y:349}, B:{x:220, y:550}},
			{element: 'wall', A:{x:280, y:349}, B:{x:300, y:550}},

			{element: 'wall', A:{x:350, y:50}, B:{x:370, y:251}},
			{element: 'wall', A:{x:430, y:50}, B:{x:450, y:251}},
			{element: 'wall', A:{x:350, y:349}, B:{x:370, y:550}},
			{element: 'wall', A:{x:430, y:349}, B:{x:450, y:550}},

			{element: 'wall', A:{x:580, y:50}, B:{x:600, y:251}},
			{element: 'wall', A:{x:500, y:50}, B:{x:520, y:251}},
			{element: 'wall', A:{x:580, y:349}, B:{x:600, y:550}},
			{element: 'wall', A:{x:500, y:349}, B:{x:520, y:550}},
		],
	},
	{
		sources: [
			{element: 'earth', x:75, y:75},
			{element: 'fire', x:75, y:225},
			{element: 'water', x:75, y:375},
			{element: 'air', x:75, y:525}
		],
		drains: [
			{element: 'earth', x:725, y:75},
			{element: 'fire', x:725, y:225},
			{element: 'water', x:725, y:375},
			{element: 'air', x:725, y:525}
		],
		converters: [],
		obstacles: [
			{element: 'air', A:{x:150, y:0}, B:{x:170, y:150}},
			{element: 'water', A:{x:150, y:150}, B:{x:170, y:300}},
			{element: 'fire', A:{x:150, y:300}, B:{x:170, y:450}},
			{element: 'earth', A:{x:150, y:450}, B:{x:170, y:600}},

			{element: 'water', A:{x:390, y:0}, B:{x:410, y:140}},

			{element: 'wall', A:{x:170, y:140}, B:{x:240, y:160}},
			{element: 'wall', A:{x:330, y:140}, B:{x:470, y:160}},
			{element: 'wall', A:{x:560, y:140}, B:{x:630, y:160}},

			{element: 'air', A:{x:390, y:160}, B:{x:410, y:290}},

			{element: 'wall', A:{x:170, y:290}, B:{x:240, y:310}},
			{element: 'wall', A:{x:330, y:290}, B:{x:470, y:310}},
			{element: 'wall', A:{x:560, y:290}, B:{x:630, y:310}},

			{element: 'earth', A:{x:390, y:310}, B:{x:410, y:440}},

			{element: 'wall', A:{x:170, y:440}, B:{x:240, y:460}},			
			{element: 'wall', A:{x:330, y:440}, B:{x:470, y:460}},
			{element: 'wall', A:{x:560, y:440}, B:{x:630, y:460}},	

			{element: 'fire', A:{x:390, y:460}, B:{x:410, y:600}},

			{element: 'air', A:{x:650, y:0}, B:{x:630, y:150}},
			{element: 'water', A:{x:650, y:150}, B:{x:630, y:300}},
			{element: 'fire', A:{x:650, y:300}, B:{x:630, y:450}},
			{element: 'earth', A:{x:650, y:450}, B:{x:630, y:600}},
		],
	},
	{
		sources: [
			{element: 'fire', x:250, y:300}
		],
		drains: [
			{element: 'water', x:550, y:300}
		],
		converters: [
			{element: 'water', x:400, y:300}
		],
		obstacles: []
	},
	{
		sources: [
			{element: 'fire', x:50, y:100},
			{element: 'water', x:50, y:500}
		],
		drains: [
			{element: 'earth', x:750, y:100},
			{element: 'air', x:750, y:500}
		],
		converters: [
			{element: 'earth', x:400, y:100},
			{element: 'air', x:400, y:500}
		],
		obstacles: [
			{element: 'wall', A:{x:100, y:0}, B:{x:120, y:250}},
			{element: 'wall', A:{x:100, y:350}, B:{x:120, y:600}},

			{element: 'wall', A:{x:200, y:290}, B:{x:700, y:310}},

			{element: 'air', A:{x:680, y:0}, B:{x:700, y:290}},
			{element: 'earth', A:{x:680, y:310}, B:{x:700, y:600}},
		]
	},
	{
		sources: [
			{element: 'fire', x:50, y:100},
			{element: 'water', x:50, y:500}
		],
		drains: [
			{element: 'earth', x:770, y:100},
			{element: 'air', x:770, y:500}
		],
		converters: [
			{element: 'air', x:400, y:100},
			{element: 'earth', x:400, y:500}
		],
		obstacles: [
			{element: 'water', A:{x:200, y:0}, B:{x:220, y:180}},
			{element: 'fire', A:{x:200, y:420}, B:{x:220, y:600}},

			{element: 'wall', A:{x:200, y:180}, B:{x:500, y:200}},
			{element: 'wall', A:{x:200, y:420}, B:{x:500, y:400}},

			{element: 'wall', A:{x:0, y:290}, B:{x:300, y:310}},
			{element: 'wall', A:{x:480, y:290}, B:{x:800, y:310}},

			{element: 'wall', A:{x:400, y:200}, B:{x:420, y:400}},

			{element: 'fire', A:{x:300, y:290}, B:{x:350, y:310}},
			{element: 'water', A:{x:350, y:290}, B:{x:400, y:310}},

			{element: 'air', A:{x:480, y:200}, B:{x:500, y:245}},
			{element: 'earth', A:{x:480, y:245}, B:{x:500, y:290}},

			{element: 'earth', A:{x:480, y:310}, B:{x:500, y:355}},
			{element: 'air', A:{x:480, y:355}, B:{x:500, y:400}},
		]
	},
	{
		sources: [
			{element: 'fire', x:75, y:75}
		],
		drains: [
			{element: 'air', x:725, y:500}
		],
		converters: [
			{element: 'earth', x:725, y:330},
			{element: 'water', x:550, y:330},
			{element: 'air', x:550, y:500},
		],
		obstacles: [
			{element: 'fire', A:{x:200, y:0}, B:{x:220, y:130}},
			{element: 'wall', A:{x:200, y:130}, B:{x:220, y:260}},
			{element: 'water', A:{x:200, y:260}, B:{x:220, y:390}},

			{element: 'water', A:{x:0, y:390}, B:{x:150, y:410}},
			{element: 'wall', A:{x:150, y:390}, B:{x:800, y:410}},

			{element: 'wall', A:{x:220, y:240}, B:{x:400, y:260}},
			{element: 'earth', A:{x:400, y:240}, B:{x:500, y:260}},
			{element: 'wall', A:{x:500, y:240}, B:{x:650, y:260}},

			{element: 'wall', A:{x:380, y:0}, B:{x:400, y:130}},
			{element: 'earth', A:{x:400, y:110}, B:{x:500, y:130}},
			{element: 'wall', A:{x:500, y:110}, B:{x:650, y:130}},

			{element: 'fire', A:{x:630, y:130}, B:{x:650, y:240}},
			{element: 'wall', A:{x:630, y:260}, B:{x:650, y:400}},
		]
	},
	{
		sources: [
			{element: 'fire', x:300, y:75},
			{element: 'earth', x:500, y:75},
		],
		drains: [
			{element: 'water', x:100, y:525},
			{element: 'air', x:700, y:525},
		],
		converters: [
			{element: 'water', x:100, y:100},
			{element: 'air', x:700, y:100},
		],
		obstacles: [
			{element: 'wall', A:{x:180, y:0}, B:{x:200, y:200}},
			{element: 'water', A:{x:180, y:200}, B:{x:200, y:250}},
			{element: 'wall', A:{x:180, y:250}, B:{x:200, y:300}},
			{element: 'fire', A:{x:180, y:300}, B:{x:200, y:350}},
			{element: 'earth', A:{x:180, y:350}, B:{x:200, y:400}},

			{element: 'wall' , A:{x:600, y:0}  , B:{x:620, y:200}},
			{element: 'air'  , A:{x:600, y:200}, B:{x:620, y:250}},
			{element: 'wall' , A:{x:600, y:250}, B:{x:620, y:300}},
			{element: 'fire' , A:{x:600, y:300}, B:{x:620, y:350}},
			{element: 'earth', A:{x:600, y:350}, B:{x:620, y:400}},

			{element: 'fire' , A:{x:200, y:180}, B:{x:400, y:200}},
			{element: 'earth' , A:{x:400, y:180}, B:{x:600, y:200}},

			{element: 'wall' , A:{x:0, y:400}, B:{x:300, y:420}},
			{element: 'air' , A:{x:300, y:400}, B:{x:400, y:420}},
			{element: 'water' , A:{x:400, y:400}, B:{x:500, y:420}},
			{element: 'wall' , A:{x:500, y:400}, B:{x:800, y:420}},
		]
	},
	{
		sources: [
			{element: 'fire', x:360, y:75},
			{element: 'water', x:440, y:75},
			{element: 'air', x:180, y:325},
			{element: 'earth', x:620, y:325},
		],
		drains: [
			{element: 'water', x:100, y:525},
			{element: 'fire', x:700, y:525},
			{element: 'air', x:50, y:325},
			{element: 'earth', x:750, y:325},
		],
		converters: [
			{element: 'water', x:115, y:220},
			{element: 'fire', x:685, y:220},
			{element: 'air', x:115, y:75},
			{element: 'earth', x:685, y:75},
		],
		obstacles: [
			{element: 'wall' , A:{x:310, y:0}, B:{x:330, y:125}},
			{element: 'wall' , A:{x:390, y:0}, B:{x:410, y:125}},
			{element: 'wall' , A:{x:390, y:350}, B:{x:410, y:600}},
			{element: 'wall' , A:{x:470, y:0}, B:{x:490, y:125}},

			{element: 'air' , A:{x:0, y:150}, B:{x:100, y:170}},
			{element: 'wall' , A:{x:100, y:150}, B:{x:250, y:170}},
			{element: 'wall' , A:{x:550, y:150}, B:{x:700, y:170}},
			{element: 'earth' , A:{x:700, y:150}, B:{x:800, y:170}},

			{element: 'wall' , A:{x:0, y:400}, B:{x:250, y:420}},
			{element: 'wall' , A:{x:550, y:400}, B:{x:800, y:420}},

			{element: 'water' , A:{x:230, y:170}, B:{x:250, y:270}},
			{element: 'wall' , A:{x:230, y:270}, B:{x:250, y:400}},

			{element: 'fire' , A:{x:550, y:170}, B:{x:570, y:270}},
			{element: 'wall' , A:{x:550, y:270}, B:{x:570, y:400}},

			{element: 'water' , A:{x:250, y:350}, B:{x:390, y:370}},
			{element: 'fire' , A:{x:410, y:350}, B:{x:550, y:370}},
		]
	},
	{
		sources: [
			{element: 'fire', x:325, y:550},
			{element: 'water', x:50, y:225},
			{element: 'earth', x:475, y:50},
			{element: 'air', x:750, y:375},
		],
		drains: [
			{element: 'fire', x:325, y:50},
			{element: 'water', x:750, y:225},
			{element: 'earth', x:475, y:550},
			{element: 'air', x:50, y:375},
		],
		converters: [
			{element: 'fire', x:675, y:525},
			{element: 'water', x:125, y:525},
			{element: 'earth', x:125, y:75},
			{element: 'air', x:675, y:75},
		],
		obstacles: [
			{element: 'wall' , A:{x:240, y:0}, B:{x:260, y:120}},
			{element: 'wall' , A:{x:390, y:0}, B:{x:410, y:120}},
			{element: 'wall' , A:{x:540, y:0}, B:{x:560, y:120}},

			{element: 'fire' , A:{x:260, y:100}, B:{x:390, y:120}},
			{element: 'earth' , A:{x:410, y:100}, B:{x:540, y:120}},

			{element: 'wall' , A:{x:240, y:480}, B:{x:260, y:600}},
			{element: 'wall' , A:{x:390, y:480}, B:{x:410, y:600}},
			{element: 'wall' , A:{x:540, y:480}, B:{x:560, y:600}},

			{element: 'fire' , A:{x:260, y:480}, B:{x:390, y:500}},
			{element: 'earth' , A:{x:410, y:480}, B:{x:540, y:500}},

			{element: 'wall' , A:{x:0, y:150}, B:{x:120, y:170}},
			{element: 'wall' , A:{x:0, y:290}, B:{x:120, y:310}},
			{element: 'wall' , A:{x:0, y:430}, B:{x:120, y:450}},

			{element: 'water' , A:{x:100, y:170}, B:{x:120, y:290}},
			{element: 'air'   , A:{x:100, y:310}, B:{x:120, y:430}},

			{element: 'wall' , A:{x:680, y:150}, B:{x:800, y:170}},
			{element: 'wall' , A:{x:680, y:290}, B:{x:800, y:310}},
			{element: 'wall' , A:{x:680, y:430}, B:{x:800, y:450}},

			{element: 'water' , A:{x:680, y:170}, B:{x:700, y:290}},
			{element: 'air'   , A:{x:680, y:310}, B:{x:700, y:430}},
		]
	},
	{
		sources: [
			{element: 'fire', x:50, y:50},
		],
		drains: [
			{element: 'fire', x:750, y:550},
		],
		converters: [

		],
		obstacles: [
			{element: 'wall' , A:{x:100, y:100}, B:{x:190, y:130}},
			{element: 'wall' , A:{x:130, y:130}, B:{x:160, y:250}},

			{element: 'wall' , A:{x:220, y:100}, B:{x:250, y:250}},
			{element: 'wall' , A:{x:250, y:160}, B:{x:280, y:190}},
			{element: 'wall' , A:{x:280, y:100}, B:{x:310, y:250}},

			{element: 'wall' , A:{x:340, y:100}, B:{x:370, y:250}},
			{element: 'wall' , A:{x:370, y:160}, B:{x:400, y:190}},
			{element: 'wall' , A:{x:370, y:100}, B:{x:400, y:130}},
			{element: 'wall' , A:{x:400, y:100}, B:{x:430, y:250}},

			{element: 'wall' , A:{x:460, y:100}, B:{x:490, y:250}},
			{element: 'wall' , A:{x:490, y:130}, B:{x:520, y:190}},
			{element: 'wall' , A:{x:520, y:160}, B:{x:550, y:220}},
			{element: 'wall' , A:{x:550, y:100}, B:{x:580, y:250}},

			{element: 'wall' , A:{x:610, y:100}, B:{x:640, y:250}},
			{element: 'wall' , A:{x:640, y:160}, B:{x:670, y:190}},
			{element: 'wall' , A:{x:670, y:100}, B:{x:700, y:160}},
			{element: 'wall' , A:{x:670, y:190}, B:{x:700, y:250}},

			{element: 'wall' , A:{x:100, y:280}, B:{x:130, y:330}},
			{element: 'wall' , A:{x:160, y:280}, B:{x:190, y:330}},
			{element: 'wall' , A:{x:130, y:330}, B:{x:160, y:430}},

			{element: 'wall' , A:{x:220, y:280}, B:{x:250, y:430}},
			{element: 'wall' , A:{x:250, y:280}, B:{x:280, y:310}},
			{element: 'wall' , A:{x:250, y:400}, B:{x:280, y:430}},
			{element: 'wall' , A:{x:280, y:280}, B:{x:310, y:430}},

			{element: 'wall' , A:{x:340, y:280}, B:{x:370, y:430}},
			{element: 'wall' , A:{x:370, y:400}, B:{x:400, y:430}},
			{element: 'wall' , A:{x:400, y:280}, B:{x:430, y:430}},

			{element: 'wall' , A:{x:460, y:280}, B:{x:490, y:370}},
			{element: 'wall' , A:{x:460, y:400}, B:{x:490, y:430}},
		]
	}
]