//#################### Default Settings 
var ListBlogLink = "http://www.kamithemedia.info/"; 
var ListCount = 5; 
var ListLabel = ""; 
var ChrCount = 45; 
var TitleCount = 66; 
var ImageSize = 240; 
var showcomments = "on"; 
var showdate = "off"; 
var showauthor = "on"; 
var showthumbnail = "on"; 
var showlabel = "off"; 
var showcontent = "off"; 
var showTotal = "on";
//################ Function Start 
function mbtlist(json) { 
document.write('<ul class="mbtlist">'); 
for (var i = 0; i < ListCount; i++) 
{
//################### Variables Declared 
var listing= ListImage = ListUrl = ListTitle = ListImage = ListContent = ListConten = ListAuthor = ListTag = ListDate = ListUpdate = ListComments = thumbUrl = TotalPosts = sk = AuthorPic= ListMonth = Y = D = M = m = YY = DD = MM = mm = TT =  "";
//################### Category 
if (json.feed.entry[i].category != null) 
{ 
for (var k = 0; k < json.feed.entry[i].category.length; k++) { 
ListTag += "<a href='"+ListBlogLink+"/search/label/"+json.feed.entry[i].category[k].term+"'>"+json.feed.entry[i].category[k].term+"</a>"; 
if(k < json.feed.entry[i].category.length-1) 
{ ListTag += " ";} 
}}
//################### URL 
for (var j = 0; j < json.feed.entry[i].link.length; j++) { 
      if (json.feed.entry[i].link[j].rel == 'alternate') { 
        break; 
      } 
    } 
ListUrl= "'" + json.feed.entry[i].link[j].href + "'";
//################### Info 
TotalPosts = json.feed.openSearch$totalResults.$t; 
if (json.feed.entry[i].title!= null) 
{ 
ListTitle= json.feed.entry[i].title.$t.substr(0, TitleCount); 
} 
if (json.feed.entry[i].thr$total) 
{ 
ListComments= "<a href='"+json.feed.entry[i].link[j].href+"#comment-form'>"+json.feed.entry[i].thr$total.$t+"</a>"; 
} 
ListAuthor= json.feed.entry[i].author[0].name.$t.split(" "); 
ListAuthor=ListAuthor.slice(0, 1).join(" ");
AuthorPic = json.feed.entry[i].author[0].gd$image.src; 
//################### Content Check
ListConten = json.feed.entry[i].content.$t; 
ListContent= ListConten.replace(/(<([^>]+)>)/ig,"").substring(0, ChrCount);
//################### Date Format
ListMonth= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
ListDate= json.feed.entry[i].published.$t.substring(0,10);
                         Y = ListDate.substring(0, 4); 
                        m = ListDate.substring(5, 7); 
                         D = ListDate.substring(8, 10); 
                         M = ListMonth[parseInt(m - 1)];                       
ListUpdate= json.feed.entry[i].updated.$t.substring(0, 16);
                         YY = ListUpdate.substring(0, 4); 
                        mm = ListUpdate.substring(5, 7); 
                         DD = ListUpdate.substring(8, 10); 
                         TT = ListUpdate.substring(11, 16); 
                         MM = ListMonth[parseInt(mm - 1)];   
//################### Thumbnail Check 
// YouTube scan
if (json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/) != null) 
{
    var youtube_id = json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop(); 
    
    if (youtube_id.length == 11) { 
        var ListImage = "'//img.youtube.com/vi/"+youtube_id+"/0.jpg'"; 
        } 
}
else if (json.feed.entry[i].media$thumbnail) 
{ 
thumbUrl = json.feed.entry[i].media$thumbnail.url; 
sk= thumbUrl.replace("/s72-c/","/s"+ImageSize+"/"); 
ListImage= "'" + sk.replace("?imgmax=800","") + "'"; 
}
else if (json.feed.entry[i].content.$t.match(/src=(.+?[\.jpg|\.gif|\.png]")/) != null) 
{ 
// Support For 3rd Party Images 
ListImage =  json.feed.entry[i].content.$t.match(/src=(.+?[\.jpg|\.gif|\.png]")/)[1]; 
}
else 
{ 
ListImage= "'http://4.bp.blogspot.com/-HALLtgFeep0/VfryhQ0C5oI/AAAAAAAAPcY/77mSGND4q84/s200/Icon.png'"; 
} 
//################### Printing List
document.write( "<li class='node"+[i]+"' >"); 
if (showthumbnail == 'on'){ 
document.write("<div class='iFeatured'><a  href=" 
+ ListUrl+ 
  "><img src=" 
+ListImage+ 
"/></a></div>"); 
} 
if (showlabel == 'on'){ 
document.write("<span class='itag'>" 
+ListTag + 
"</span>"); 
} 
document.write("<a class='mbttitle' href=" 
+ ListUrl+ 
">" 
+ ListTitle+ 
"</a><div class='iline'>");
if (showauthor == 'on'){ 
document.write("<span class='iauthor'><img class='iauthorpic' src='"+AuthorPic+"'/>" 
+ListAuthor+ 
"</span>"); 
} 
if (showcomments == 'on'){ 
document.write("<span class='icomments'>" 
+ListComments + 
"</span> "); 
}
if (showdate == 'on'){ 
document.write("<span class='idate'>" 
+ M + 
" " 
+ D + 
"</span>"); 
}
if (showcontent == 'on'){ 
document.write("<div class='icontent'>" 
+ListContent + 
"...</div> "); 
} 
document.write("</div></li>");
}if (showTotal == 'on'){ 
document.write("<div class='itotal'><span> <a href='"+ListBlogLink+"/search/label/"+ListLabel+"'>View all <font>"+TotalPosts+"</font> posts in  →  " +ListLabel+" </a></span></div>"); 
} 
document.write("</ul>"); 
}
document.write("<script src='"+ListBlogLink+"/feeds/posts/default?alt=json-in-script&callback=mbtlist'></"+"script>"); 