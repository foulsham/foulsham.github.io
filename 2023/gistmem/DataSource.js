//Data sources which list filenames and conditions

var PracticeDataSource = ["bathroom12.jpg","bedroom16.jpg","kitchen13.jpg"];
var PracticeTest = ["bathroom12.jpg","bathroom13.jpg","bedroom16.jpg","bedroom19.jpg","kitchen13.jpg","kitchen14.jpg"];

var A = 
[[1,"bathroom1.jpg","LC",1,1,3],
[2,"bathroom2.jpg","F",1,1,3],
[3,"bathroom3.jpg","HC",1,1,3],
[4,"beach2.jpg","LC",2,1,4],
[5,"beach3.jpg","F",2,1,4],
[6,"beach4.jpg","F",2,1,4],
[7,"beach5.jpg","HC",2,1,4],
[8,"bedroom1.jpg","LC",3,1,5],
[9,"bedroom2.jpg","F",3,1,5],
[10,"bedroom3.jpg","F",3,1,5],
[11,"bedroom4.jpg","F",3,1,5],
[12,"bedroom5.jpg","HC",3,1,5],
[13,"classroom2.jpg","LC",4,1,3],
[14,"classroom3.jpg","F",4,1,3],
[15,"classroom4.jpg","HC",4,1,3],
[16,"kitchen1.jpg","LC",5,1,4],
[17,"kitchen2.jpg","F",5,1,4],
[18,"kitchen3.jpg","F",5,1,4],
[19,"kitchen4.jpg","HC",5,1,4],
[20,"living1.jpg","LC",6,1,5],
[21,"living2.jpg","F",6,1,5],
[22,"living3.jpg","F",6,1,5],
[23,"living4.jpg","F",6,1,5],
[24,"living5.jpg","HC",6,1,5],
[25,"mountain1.jpg","LC",7,1,3],
[26,"mountain2.jpg","F",7,1,3],
[27,"mountain3.jpg","HC",7,1,3],
[28,"rainforest1.jpg","LC",8,1,4],
[29,"rainforest2.jpg","F",8,1,4],
[30,"rainforest3.jpg","F",8,1,4],
[31,"rainforest5.jpg","HC",8,1,4],
[32,"river1.jpg","LC",9,1,5],
[33,"river3.jpg","F",9,1,5],
[34,"river4.jpg","F",9,1,5],
[35,"river5.jpg","F",9,1,5],
[36,"river6.jpg","HC",9,1,5],
[37,"beach6.jpg","LC",10,2,3],
[38,"beach8.jpg","F",10,2,3],
[39,"beach9.jpg","HC",10,2,3],
[40,"bedroom6.jpg","LC",11,2,4],
[41,"bedroom7.jpg","F",11,2,4],
[42,"bedroom8.jpg","F",11,2,4],
[43,"bedroom9.jpg","HC",11,2,4],
[44,"bathroom4.jpg","LC",12,2,5],
[45,"bathroom5.jpg","F",12,2,5],
[46,"bathroom6.jpg","F",12,2,5],
[47,"bathroom7.jpg","F",12,2,5],
[48,"bathroom8.jpg","HC",12,2,5],
[49,"kitchen5.jpg","LC",13,2,3],
[50,"kitchen6.jpg","F",13,2,3],
[51,"kitchen7.jpg","HC",13,2,3],
[52,"living6.jpg","LC",14,2,4],
[53,"living7.jpg","F",14,2,4],
[54,"living8.jpg","F",14,2,4],
[55,"living9.jpg","HC",14,2,4],
[56,"classroom5.jpg","LC",15,2,5],
[57,"classroom6.jpg","F",15,2,5],
[58,"classroom8.jpg","F",15,2,5],
[59,"classroom9.jpg","F",15,2,5],
[60,"classroom10.jpg","HC",15,2,5],
[61,"rainforest6.jpg","LC",16,2,3],
[62,"rainforest7.jpg","F",16,2,3],
[63,"rainforest8.jpg","HC",16,2,3],
[64,"river7.jpg","LC",17,2,4],
[65,"river8.jpg","F",17,2,4],
[66,"river9.jpg","F",17,2,4],
[67,"river10.jpg","HC",17,2,4],
[68,"mountain4.jpg","LC",18,2,5],
[69,"mountain5.jpg","F",18,2,5],
[70,"mountain6.jpg","F",18,2,5],
[71,"mountain7.jpg","F",18,2,5],
[72,"mountain8.jpg","HC",18,2,5]];

var B = 
[[1,"bathroom3.jpg","LC",1,1,3],
[2,"bathroom2.jpg","F",1,1,3],
[3,"bathroom1.jpg","HC",1,1,3],
[4,"beach5.jpg","LC",2,1,4],
[5,"beach3.jpg","F",2,1,4],
[6,"beach4.jpg","F",2,1,4],
[7,"beach2.jpg","HC",2,1,4],
[8,"bedroom5.jpg","LC",3,1,5],
[9,"bedroom2.jpg","F",3,1,5],
[10,"bedroom3.jpg","F",3,1,5],
[11,"bedroom4.jpg","F",3,1,5],
[12,"bedroom1.jpg","HC",3,1,5],
[13,"classroom4.jpg","LC",4,1,3],
[14,"classroom3.jpg","F",4,1,3],
[15,"classroom2.jpg","HC",4,1,3],
[16,"kitchen4.jpg","LC",5,1,4],
[17,"kitchen2.jpg","F",5,1,4],
[18,"kitchen3.jpg","F",5,1,4],
[19,"kitchen1.jpg","HC",5,1,4],
[20,"living5.jpg","LC",6,1,5],
[21,"living2.jpg","F",6,1,5],
[22,"living3.jpg","F",6,1,5],
[23,"living4.jpg","F",6,1,5],
[24,"living1.jpg","HC",6,1,5],
[25,"mountain3.jpg","LC",7,1,3],
[26,"mountain2.jpg","F",7,1,3],
[27,"mountain1.jpg","HC",7,1,3],
[28,"rainforest5.jpg","LC",8,1,4],
[29,"rainforest2.jpg","F",8,1,4],
[30,"rainforest3.jpg","F",8,1,4],
[31,"rainforest1.jpg","HC",8,1,4],
[32,"river6.jpg","LC",9,1,5],
[33,"river3.jpg","F",9,1,5],
[34,"river4.jpg","F",9,1,5],
[35,"river5.jpg","F",9,1,5],
[36,"river1.jpg","HC",9,1,5],
[37,"beach9.jpg","LC",10,2,3],
[38,"beach8.jpg","F",10,2,3],
[39,"beach6.jpg","HC",10,2,3],
[40,"bedroom9.jpg","LC",11,2,4],
[41,"bedroom7.jpg","F",11,2,4],
[42,"bedroom8.jpg","F",11,2,4],
[43,"bedroom6.jpg","HC",11,2,4],
[44,"bathroom8.jpg","LC",12,2,5],
[45,"bathroom5.jpg","F",12,2,5],
[46,"bathroom6.jpg","F",12,2,5],
[47,"bathroom7.jpg","F",12,2,5],
[48,"bathroom4.jpg","HC",12,2,5],
[49,"kitchen7.jpg","LC",13,2,3],
[50,"kitchen6.jpg","F",13,2,3],
[51,"kitchen5.jpg","HC",13,2,3],
[52,"living9.jpg","LC",14,2,4],
[53,"living7.jpg","F",14,2,4],
[54,"living8.jpg","F",14,2,4],
[55,"living6.jpg","HC",14,2,4],
[56,"classroom10.jpg","LC",15,2,5],
[57,"classroom6.jpg","F",15,2,5],
[58,"classroom8.jpg","F",15,2,5],
[59,"classroom9.jpg","F",15,2,5],
[60,"classroom5.jpg","HC",15,2,5],
[61,"rainforest8.jpg","LC",16,2,3],
[62,"rainforest7.jpg","F",16,2,3],
[63,"rainforest6.jpg","HC",16,2,3],
[64,"river10.jpg","LC",17,2,4],
[65,"river8.jpg","F",17,2,4],
[66,"river9.jpg","F",17,2,4],
[67,"river7.jpg","HC",17,2,4],
[68,"mountain8.jpg","LC",18,2,5],
[69,"mountain5.jpg","F",18,2,5],
[70,"mountain6.jpg","F",18,2,5],
[71,"mountain7.jpg","F",18,2,5],
[72,"mountain4.jpg","HC",18,2,5]];

var ExpDataSource = [A,B];

var testA = 
[["bathroom2.jpg","F","O"],
["beach4.jpg","F","O"],
["kitchen2.jpg","F","O"],
["rainforest3.jpg","F","O"],
["bedroom7.jpg","F","O"],
["living8.jpg","F","O"],
["classroom8.jpg","F","O"],
["river8.jpg","F","O"],
["mountain5.jpg","F","O"],
["bathroom8.jpg","HC","O"],
["beach5.jpg","HC","O"],
["bedroom9.jpg","HC","O"],
["classroom4.jpg","HC","O"],
["kitchen7.jpg","HC","O"],
["living5.jpg","HC","O"],
["mountain8.jpg","HC","O"],
["rainforest5.jpg","HC","O"],
["river10.jpg","HC","O"],
["bathroom1.jpg","LC","O"],
["beach6.jpg","LC","O"],
["bedroom1.jpg","LC","O"],
["classroom5.jpg","LC","O"],
["kitchen1.jpg","LC","O"],
["living6.jpg","LC","O"],
["mountain1.jpg","LC","O"],
["rainforest6.jpg","LC","O"],
["river1.jpg","LC","O"],
["bathroom9.jpg","N","N"],
["bathroom10.jpg","N","N"],
["bathroom11.jpg","N","N"],
["beach10.jpg","N","N"],
["beach12.jpg","N","N"],
["beach14.jpg","N","N"],
["bedroom11.jpg","N","N"],
["bedroom13.jpg","N","N"],
["bedroom15.jpg","N","N"],
["classroom12.jpg","N","N"],
["classroom15.jpg","N","N"],
["classroom16.jpg","N","N"],
["kitchen9.jpg","N","N"],
["kitchen10.jpg","N","N"],
["kitchen11.jpg","N","N"],
["living10.jpg","N","N"],
["living12.jpg","N","N"],
["living13.jpg","N","N"],
["mountain9.jpg","N","N"],
["mountain10.jpg","N","N"],
["mountain11.jpg","N","N"],
["rainforest9.jpg","N","N"],
["rainforest10.jpg","N","N"],
["rainforest11.jpg","N","N"],
["river11.jpg","N","N"],
["river12.jpg","N","N"],
["river13.jpg","N","N"]];

var testB =
[["bathroom2.jpg","F","O"],
["beach4.jpg","F","O"],
["kitchen2.jpg","F","O"],
["rainforest3.jpg","F","O"],
["bedroom7.jpg","F","O"],
["living8.jpg","F","O"],
["classroom8.jpg","F","O"],
["river8.jpg","F","O"],
["mountain5.jpg","F","O"],
["bathroom1.jpg","HC","O"],
["beach6.jpg","HC","O"],
["bedroom1.jpg","HC","O"],
["classroom5.jpg","HC","O"],
["kitchen1.jpg","HC","O"],
["living6.jpg","HC","O"],
["mountain1.jpg","HC","O"],
["rainforest6.jpg","HC","O"],
["river1.jpg","HC","O"],
["bathroom8.jpg","LC","O"],
["beach5.jpg","LC","O"],
["bedroom9.jpg","LC","O"],
["classroom4.jpg","LC","O"],
["kitchen7.jpg","LC","O"],
["living5.jpg","LC","O"],
["mountain8.jpg","LC","O"],
["rainforest5.jpg","LC","O"],
["river10.jpg","LC","O"],
["bathroom9.jpg","N","N"],
["bathroom10.jpg","N","N"],
["bathroom11.jpg","N","N"],
["beach10.jpg","N","N"],
["beach12.jpg","N","N"],
["beach14.jpg","N","N"],
["bedroom11.jpg","N","N"],
["bedroom13.jpg","N","N"],
["bedroom15.jpg","N","N"],
["classroom12.jpg","N","N"],
["classroom15.jpg","N","N"],
["classroom16.jpg","N","N"],
["kitchen9.jpg","N","N"],
["kitchen10.jpg","N","N"],
["kitchen11.jpg","N","N"],
["living10.jpg","N","N"],
["living12.jpg","N","N"],
["living13.jpg","N","N"],
["mountain9.jpg","N","N"],
["mountain10.jpg","N","N"],
["mountain11.jpg","N","N"],
["rainforest9.jpg","N","N"],
["rainforest10.jpg","N","N"],
["rainforest11.jpg","N","N"],
["river11.jpg","N","N"],
["river12.jpg","N","N"],
["river13.jpg","N","N"]
];

var ExpTest = [testA,testB];