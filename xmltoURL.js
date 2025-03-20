/*
First convert site.xml to JSON and paste here
https://jsonformatter.org/xml-to-json
*/
const fs = require('fs');

const jsonObj= 
{
	"urlset": {
		"url": [
			{
				"loc": "http://glidersindia.in/",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "1.00"
			},
			{
				"loc": "http://glidersindia.in/index.php",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-leadership",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-opf",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-culture",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-history",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-customer",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-social-respons",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-corp-governance",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about-hr",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vision",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=mission",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=news-media",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=news-disclaimer",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=news-awards",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=mdpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=cpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=bpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=ppara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=opara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=float",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=boat",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=catalogs",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=m_services",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=m_export",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-about",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-man-policy",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-integ-pact",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-online-complaint",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-publication",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-activity",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-vnc-week",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vig-gallery",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=m_rti",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=m_makeinindia",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=aero2023",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=azadi",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=g20",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=makeindia",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=float52",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=fp_ppsu30",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=fp_hawk",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=fp_gst",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=totbplca",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=fp_more",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=ulink_others",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=vietnam-def-expo",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=samnvay22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=kenya-defexpo22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=dir-adrde-visit22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=malaysia22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=about",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/?p=contact",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.80"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-leadership",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-opf",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-culture",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-history",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-customer",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-social-respons",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-corp-governance",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about-hr",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vision",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=mission",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=news-media",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=news-disclaimer",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=news-awards",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=mdpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=cpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=bpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ppara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=opara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=float",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=boat",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=catalogs",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=m_services",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=m_export",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-about",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-man-policy",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-integ-pact",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-online-complaint",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-publication",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-activity",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-vnc-week",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vig-gallery",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=m_rti",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=m_makeinindia",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=aero2023",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=azadi",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=g20",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=makeindia",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=float52",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=fp_ppsu30",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=fp_hawk",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=fp_gst",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=totbplca",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=fp_more",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ulink_others",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=vietnam-def-expo",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=samnvay22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=kenya-defexpo22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=dir-adrde-visit22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=malaysia22",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=about",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=contact",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=cmd",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=hrodir",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=findir",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=dirgov",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=gm",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=rajbhasa",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=ptam",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=ptar",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=ptrm",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=ptrr",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=hap",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=cffp",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=sdpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=hdpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=su30",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=mig21",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=mig23",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=mig29",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=mirage2000",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=jaguar",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=ppkiran",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=ppjaguar",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=parasail",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/?p=pilluminating",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/images/product/catalog.pdf",
				"lastmod": "2023-02-05T16:57:30+00:00",
				"priority": "0.64"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=cmd",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=hrodir",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=findir",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=dirgov",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=gm",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=rajbhasa",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ptam",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ptar",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ptrm",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ptrr",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=hap",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=cffp",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=sdpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=hdpara",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=su30",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=mig21",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=mig23",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=mig29",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=mirage2000",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=jaguar",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ppkiran",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=ppjaguar",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=parasail",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			},
			{
				"loc": "http://glidersindia.in/index.php?p=pilluminating",
				"lastmod": "2023-02-08T19:37:01+00:00",
				"priority": "0.51"
			}
		],
		"_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
		"_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
		"_xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
	}
}
const DOMAIN = 'http://glidersindia.in';
const OUTPUT_FILE = 'output/glidersindia_sitemap_urls.txt';
const EXCLUDED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.png', '.ppt', '.pptx'];

const urls = new Set();
const shouldExclude = (url) => {
    return EXCLUDED_EXTENSIONS.some(ext => url.toLowerCase().endsWith(ext));
};

const urlset= jsonObj.urlset.url
for(i=0,j=urlset.length;i<j;i++){
	const link=urlset[i].loc;
	// console.log('Full Url:', link)
    if (link) {
        try {
            if (link.startsWith(DOMAIN) && !shouldExclude(link)) {
                urls.add(link);
            }
        } catch (error) {
            console.error(`Invalid URL: ${link}`);
        }
    }	
}
console.log(urls)
fs.writeFileSync(OUTPUT_FILE, Array.from(urls).join('\n'), 'utf8');
console.log(`✅ URLs saved in ${OUTPUT_FILE}`);
