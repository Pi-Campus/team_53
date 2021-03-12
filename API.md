# Askdata quick start:

* **1. SignUp:** Register to [Askdata](https://app.askdata.com/login) with your own email  ⚠️  Do not use the Social Login with Google/Slack.
* **2. Login to Askdata using REST API:** Get the token that will be used for all the other APIs
* **3. Select Workspace:** Switch to the Pi Day workspace.
* **4. Check current Workspace:** Check your workspace is the one provided for Pi Day 2021.
* **5. How to ask data:** Use Natural language queries for getting data. Sample request and response are provided.
* **HINT: Sample queries**


## 1. SignUp
Register to [Askdata](https://app.askdata.com/login) with your own email.  ⚠️  Do not use the Social Login with Google/Slack.

**Landing page**![image](https://user-images.githubusercontent.com/74064313/110775123-d959a680-825e-11eb-94ba-ab2173b07f02.png)

**Signup with mail**![image](https://user-images.githubusercontent.com/74064313/110775513-4705d280-825f-11eb-892b-576dde234455.png)
&#8594;**After signing-up you will receive an email with the link for confirming your registration.** 

**User activated**![image](https://user-images.githubusercontent.com/74064313/110776912-d52e8880-8260-11eb-8475-7b136dc0bdf6.png)

## 2. Login to Askdata using REST API (for getting token)
Request: <br />
```bash
curl --location --request POST 'https://api.askdata.com/security/domain/askdata/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic ZmVlZDpmZWVk' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username={{youremail}}' \
--data-urlencode 'password={{yourpassword}}'
```

:warning: **If you don't remember Askdata password or your registered using Social login**: You must reset the password and request a new one!

Response: <br />
```json
{
    "access_token": "{{token}}",
    "token_type": "bearer",
    "refresh_token": "xxxxx",
    "expires_in": 2629799,
    "scope": "write openid read"
}
```

## 3. Select Workspace "pi_day" 
Use the API for switching workspace. Include your user token. <br />
Request: <br />
```bash
curl --location --request POST 'https://api.askdata.com/smartfeed/askdata/workspace/switch' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "agent_slug": "pi_day"
}'
```

Response: <br />
```json
{
    "id": "d53912d3-5d44-460a-8a38-abb200ede4f9",
    "domain": "d45834e9-7642-4011-9869-f942faa79e9b",
    "label": "pi day",
    "description": "Workspace for Pi Day HackParty 2021",
    "icon": "https://askdata-prod.s3.amazonaws.com/agent/pi_campus.jpg",
    "count": 0,
    "language": "en",
    "time": 1615453633400,
    "datasets": [
        {
            "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
            "type": "MYSQL"
        },
        {
            "id": "a87aa80c-fe00-422e-94fd-043056a13dce-MYSQL-4c9f03f2-6d3d-404b-9515-d8a937526069",
            "type": "MYSQL"
        },
        {
            "id": "f5f552d5-89a1-4f64-bb86-ed03d0d322f3-MYSQL-1f8980f4-a58f-4a14-a9ad-b424a9283faf",
            "type": "MYSQL"
        }
    ],
    "accessLevel": "READER",
    "slug": "pi_day"
}
```

## 4. Check current Workspace
Request: <br />
```bash
curl --location --request GET 'https://api.askdata.com/smartfeed/askdata/workspace/current' \
--header 'Authorization: Bearer {{token}}' \
--header 'Content-Type: application/json' \
--data-raw
```

Response: <br />
```json
{
    "agent": {
        "id": "d53912d3-5d44-460a-8a38-abb200ede4f9",
        "domain": "d45834e9-7642-4011-9869-f942faa79e9b",
        "label": "pi day",
        "description": "Workspace for Pi Day HackParty 2021",
        "icon": "https://askdata-prod.s3.amazonaws.com/agent/pi_campus.jpg",
        "count": 0,
        "language": "en",
        "time": 1615481787877,
        "datasets": [
            {
                "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
                "type": "MYSQL"
            },
            {
                "id": "a87aa80c-fe00-422e-94fd-043056a13dce-MYSQL-4c9f03f2-6d3d-404b-9515-d8a937526069",
                "type": "MYSQL"
            },
            {
                "id": "f5f552d5-89a1-4f64-bb86-ed03d0d322f3-MYSQL-1f8980f4-a58f-4a14-a9ad-b424a9283faf",
                "type": "MYSQL"
            }
        ],
        "accessLevel": "READER",
        "slug": "pi_day"
    }
}
```

The referring workspace link is https://askdata.com/pi_day
  
## 5. How to ask data
Sample request (to **Covid-19 US Counties** dataset): <br />
```bash
curl --location --request POST 'https://api.askdata.com/smartinsight/data/nl/result' \
--header 'authorization: Bearer {{token}}' \
--header 'Content-Type: application/json' \
--data-raw ' {"nl":"Total cases by county","language":"en"}'
```
Response (Sample): <br />
```json
{
    "id": null,
    "dataset": {
        "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
        "name": "Covid-19 US Counties",
        "icon": "https://askdata-prod.s3.amazonaws.com/dataset/gjkVMelR_400x400.png"
    },
    "connection": "",
    "executedSQLQuery": "SELECT `county`, SUM(`cases`) AS `cases`, `Latitude` AS `Latitude`, `Longitude` AS `Longitude` FROM `innaas-dev`.covid_us_counties WHERE `date` = '2021-03-10' GROUP BY `county`, `Latitude`, `Longitude` ORDER BY `cases` DESC",
    "schema": [
        {
            "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-ENTITY_TYPE-COUNTY",
            "dataset": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
            "type": "ENTITY_TYPE",
            "code": "COUNTY",
            "name": "County",
            "aggregation": "",
            "icon": null,
            "format": "",
            "locale": "",
            "dataType": "text",
            "internalDataType": "STRING",
            "measurementUnit": null,
            "searchable": false,
            "measure": false,
            "dimension": true
        },
        {
            "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-MEASURE-CASES",
            "dataset": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
            "type": "MEASURE",
            "code": "CASES",
            "name": "Total Cases",
            "aggregation": "SUM",
            "icon": null,
            "format": "###,##0",
            "locale": "en",
            "dataType": "bigint",
            "internalDataType": "NUMERIC",
            "measurementUnit": null,
            "searchable": false,
            "measure": true,
            "dimension": false
        },
        {
            "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-ENTITY_TYPE-LATITUDE",
            "dataset": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
            "type": "ENTITY_TYPE",
            "code": "LATITUDE",
            "name": "Latitude",
            "aggregation": "",
            "icon": null,
            "format": "",
            "locale": "",
            "dataType": "double",
            "internalDataType": "NUMERIC",
            "measurementUnit": null,
            "searchable": false,
            "measure": false,
            "dimension": true
        },
        {
            "id": "d3976c00-0763-4494-9ac1-140b8f8ae586-ENTITY_TYPE-LONGITUDE",
            "dataset": "d3976c00-0763-4494-9ac1-140b8f8ae586-MYSQL-f97e5f82-4ed3-440d-b842-590b6e7c2f48",
            "type": "ENTITY_TYPE",
            "code": "LONGITUDE",
            "name": "Longitude",
            "aggregation": "",
            "icon": null,
            "format": "",
            "locale": "",
            "dataType": "text",
            "internalDataType": "STRING",
            "measurementUnit": null,
            "searchable": false,
            "measure": false,
            "dimension": true
        }
    ],
    "data": [
        {
            "cells": [
                {
                    "rawValue": "Los Angeles",
                    "value": "Los Angeles"
                },
                {
                    "rawValue": "1,207,361",
                    "value": "1,207,361"
                },
                {
                    "rawValue": 34.196397999999995,
                    "value": "34.196397999999995"
                },
                {
                    "rawValue": "–118.261862",
                    "value": "–118.261862"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "New York City",
                    "value": "New York City"
                },
                {
                    "rawValue": "762,458",
                    "value": "762,458"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Maricopa",
                    "value": "Maricopa"
                },
                {
                    "rawValue": "517,726",
                    "value": "517,726"
                },
                {
                    "rawValue": 33.346540999999995,
                    "value": "33.346540999999995"
                },
                {
                    "rawValue": "–112.495534",
                    "value": "–112.495534"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cook",
                    "value": "Cook"
                },
                {
                    "rawValue": "480,487",
                    "value": "480,487"
                },
                {
                    "rawValue": 41.894294,
                    "value": "41.894294"
                },
                {
                    "rawValue": "–87.645455",
                    "value": "–87.645455"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Miami-Dade",
                    "value": "Miami-Dade"
                },
                {
                    "rawValue": "422,539",
                    "value": "422,539"
                },
                {
                    "rawValue": 25.610494,
                    "value": "25.610494"
                },
                {
                    "rawValue": "–80.499045",
                    "value": "–80.499045"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harris",
                    "value": "Harris"
                },
                {
                    "rawValue": "360,938",
                    "value": "360,938"
                },
                {
                    "rawValue": 29.857273,
                    "value": "29.857273"
                },
                {
                    "rawValue": "–95.393037",
                    "value": "–95.393037"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Riverside",
                    "value": "Riverside"
                },
                {
                    "rawValue": "291,675",
                    "value": "291,675"
                },
                {
                    "rawValue": 33.729828000000005,
                    "value": "33.729828000000005"
                },
                {
                    "rawValue": "–116.002239",
                    "value": "–116.002239"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Bernardino",
                    "value": "San Bernardino"
                },
                {
                    "rawValue": "288,135",
                    "value": "288,135"
                },
                {
                    "rawValue": 34.85722,
                    "value": "34.85722"
                },
                {
                    "rawValue": "–116.181197",
                    "value": "–116.181197"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dallas",
                    "value": "Dallas"
                },
                {
                    "rawValue": "285,332",
                    "value": "285,332"
                },
                {
                    "rawValue": 32.766987,
                    "value": "32.766987"
                },
                {
                    "rawValue": "–96.778424",
                    "value": "–96.778424"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Diego",
                    "value": "San Diego"
                },
                {
                    "rawValue": "264,160",
                    "value": "264,160"
                },
                {
                    "rawValue": 33.023604,
                    "value": "33.023604"
                },
                {
                    "rawValue": "–116.776117",
                    "value": "–116.776117"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orange",
                    "value": "Orange"
                },
                {
                    "rawValue": "263,111",
                    "value": "263,111"
                },
                {
                    "rawValue": 33.675686999999996,
                    "value": "33.675686999999996"
                },
                {
                    "rawValue": "–117.777207",
                    "value": "–117.777207"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tarrant",
                    "value": "Tarrant"
                },
                {
                    "rawValue": "246,077",
                    "value": "246,077"
                },
                {
                    "rawValue": 32.772040000000004,
                    "value": "32.772040000000004"
                },
                {
                    "rawValue": "–97.291291",
                    "value": "–97.291291"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clark",
                    "value": "Clark"
                },
                {
                    "rawValue": "229,415",
                    "value": "229,415"
                },
                {
                    "rawValue": 36.214236,
                    "value": "36.214236"
                },
                {
                    "rawValue": "–115.013819",
                    "value": "–115.013819"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Broward",
                    "value": "Broward"
                },
                {
                    "rawValue": "201,261",
                    "value": "201,261"
                },
                {
                    "rawValue": 26.19352,
                    "value": "26.19352"
                },
                {
                    "rawValue": "–80.476658",
                    "value": "–80.476658"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bexar",
                    "value": "Bexar"
                },
                {
                    "rawValue": "199,077",
                    "value": "199,077"
                },
                {
                    "rawValue": 29.448671,
                    "value": "29.448671"
                },
                {
                    "rawValue": "–98.520147",
                    "value": "–98.520147"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Suffolk",
                    "value": "Suffolk"
                },
                {
                    "rawValue": "168,199",
                    "value": "168,199"
                },
                {
                    "rawValue": 40.943554,
                    "value": "40.943554"
                },
                {
                    "rawValue": "–72.692218",
                    "value": "–72.692218"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Nassau",
                    "value": "Nassau"
                },
                {
                    "rawValue": "154,288",
                    "value": "154,288"
                },
                {
                    "rawValue": 40.729687,
                    "value": "40.729687"
                },
                {
                    "rawValue": "–73.589384",
                    "value": "–73.589384"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Salt Lake",
                    "value": "Salt Lake"
                },
                {
                    "rawValue": "140,455",
                    "value": "140,455"
                },
                {
                    "rawValue": 40.667882,
                    "value": "40.667882"
                },
                {
                    "rawValue": "–111.924244",
                    "value": "–111.924244"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "El Paso",
                    "value": "El Paso"
                },
                {
                    "rawValue": "125,985",
                    "value": "125,985"
                },
                {
                    "rawValue": 31.766403000000004,
                    "value": "31.766403000000004"
                },
                {
                    "rawValue": "–106.241391",
                    "value": "–106.241391"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Palm Beach",
                    "value": "Palm Beach"
                },
                {
                    "rawValue": "124,228",
                    "value": "124,228"
                },
                {
                    "rawValue": 26.645763,
                    "value": "26.645763"
                },
                {
                    "rawValue": "–80.448673",
                    "value": "–80.448673"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Philadelphia",
                    "value": "Philadelphia"
                },
                {
                    "rawValue": "121,242",
                    "value": "121,242"
                },
                {
                    "rawValue": 40.009376,
                    "value": "40.009376"
                },
                {
                    "rawValue": "–75.133346",
                    "value": "–75.133346"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orange",
                    "value": "Orange"
                },
                {
                    "rawValue": "117,030",
                    "value": "117,030"
                },
                {
                    "rawValue": 28.514435,
                    "value": "28.514435"
                },
                {
                    "rawValue": "–81.323295",
                    "value": "–81.323295"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hillsborough",
                    "value": "Hillsborough"
                },
                {
                    "rawValue": "114,422",
                    "value": "114,422"
                },
                {
                    "rawValue": 27.90659,
                    "value": "27.90659"
                },
                {
                    "rawValue": "–82.349568",
                    "value": "–82.349568"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Middlesex",
                    "value": "Middlesex"
                },
                {
                    "rawValue": "114,299",
                    "value": "114,299"
                },
                {
                    "rawValue": 42.479477,
                    "value": "42.479477"
                },
                {
                    "rawValue": "–71.396507",
                    "value": "–71.396507"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Franklin",
                    "value": "Franklin"
                },
                {
                    "rawValue": "113,640",
                    "value": "113,640"
                },
                {
                    "rawValue": 39.969446999999995,
                    "value": "39.969446999999995"
                },
                {
                    "rawValue": "–83.008258",
                    "value": "–83.008258"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Santa Clara",
                    "value": "Santa Clara"
                },
                {
                    "rawValue": "112,174",
                    "value": "112,174"
                },
                {
                    "rawValue": 37.220777000000005,
                    "value": "37.220777000000005"
                },
                {
                    "rawValue": "–121.690622",
                    "value": "–121.690622"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Westchester",
                    "value": "Westchester"
                },
                {
                    "rawValue": "111,338",
                    "value": "111,338"
                },
                {
                    "rawValue": 41.152770000000004,
                    "value": "41.152770000000004"
                },
                {
                    "rawValue": "–73.745912",
                    "value": "–73.745912"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pima",
                    "value": "Pima"
                },
                {
                    "rawValue": "110,790",
                    "value": "110,790"
                },
                {
                    "rawValue": 32.128237,
                    "value": "32.128237"
                },
                {
                    "rawValue": "–111.783018",
                    "value": "–111.783018"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Milwaukee",
                    "value": "Milwaukee"
                },
                {
                    "rawValue": "107,920",
                    "value": "107,920"
                },
                {
                    "rawValue": 43.017655,
                    "value": "43.017655"
                },
                {
                    "rawValue": "–87.481575",
                    "value": "–87.481575"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wayne",
                    "value": "Wayne"
                },
                {
                    "rawValue": "104,735",
                    "value": "104,735"
                },
                {
                    "rawValue": 42.284664,
                    "value": "42.284664"
                },
                {
                    "rawValue": "–83.261953",
                    "value": "–83.261953"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kern",
                    "value": "Kern"
                },
                {
                    "rawValue": "104,509",
                    "value": "104,509"
                },
                {
                    "rawValue": 35.346629,
                    "value": "35.346629"
                },
                {
                    "rawValue": "–118.729506",
                    "value": "–118.729506"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hennepin",
                    "value": "Hennepin"
                },
                {
                    "rawValue": "102,270",
                    "value": "102,270"
                },
                {
                    "rawValue": 45.006064,
                    "value": "45.006064"
                },
                {
                    "rawValue": "–93.475185",
                    "value": "–93.475185"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mecklenburg",
                    "value": "Mecklenburg"
                },
                {
                    "rawValue": "98,496",
                    "value": "98,496"
                },
                {
                    "rawValue": 35.246862,
                    "value": "35.246862"
                },
                {
                    "rawValue": "–80.833832",
                    "value": "–80.833832"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cuyahoga",
                    "value": "Cuyahoga"
                },
                {
                    "rawValue": "97,639",
                    "value": "97,639"
                },
                {
                    "rawValue": 41.760391999999996,
                    "value": "41.760391999999996"
                },
                {
                    "rawValue": "–81.724217",
                    "value": "–81.724217"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fresno",
                    "value": "Fresno"
                },
                {
                    "rawValue": "96,744",
                    "value": "96,744"
                },
                {
                    "rawValue": 36.761006,
                    "value": "36.761006"
                },
                {
                    "rawValue": "–119.655019",
                    "value": "–119.655019"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sacramento",
                    "value": "Sacramento"
                },
                {
                    "rawValue": "94,769",
                    "value": "94,769"
                },
                {
                    "rawValue": 38.450010999999996,
                    "value": "38.450010999999996"
                },
                {
                    "rawValue": "–121.340441",
                    "value": "–121.340441"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gwinnett",
                    "value": "Gwinnett"
                },
                {
                    "rawValue": "94,263",
                    "value": "94,263"
                },
                {
                    "rawValue": 33.959101000000004,
                    "value": "33.959101000000004"
                },
                {
                    "rawValue": "–84.022938",
                    "value": "–84.022938"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marion",
                    "value": "Marion"
                },
                {
                    "rawValue": "91,763",
                    "value": "91,763"
                },
                {
                    "rawValue": 39.782976,
                    "value": "39.782976"
                },
                {
                    "rawValue": "–86.135794",
                    "value": "–86.135794"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Davidson",
                    "value": "Davidson"
                },
                {
                    "rawValue": "91,173",
                    "value": "91,173"
                },
                {
                    "rawValue": 36.169129,
                    "value": "36.169129"
                },
                {
                    "rawValue": "–86.784790",
                    "value": "–86.784790"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Utah",
                    "value": "Utah"
                },
                {
                    "rawValue": "91,127",
                    "value": "91,127"
                },
                {
                    "rawValue": 40.120409,
                    "value": "40.120409"
                },
                {
                    "rawValue": "–111.668667",
                    "value": "–111.668667"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Duval",
                    "value": "Duval"
                },
                {
                    "rawValue": "90,097",
                    "value": "90,097"
                },
                {
                    "rawValue": 30.335245,
                    "value": "30.335245"
                },
                {
                    "rawValue": "–81.648113",
                    "value": "–81.648113"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Louis",
                    "value": "St. Louis"
                },
                {
                    "rawValue": "89,767",
                    "value": "89,767"
                },
                {
                    "rawValue": 38.640702000000005,
                    "value": "38.640702000000005"
                },
                {
                    "rawValue": "–90.445954",
                    "value": "–90.445954"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shelby",
                    "value": "Shelby"
                },
                {
                    "rawValue": "89,055",
                    "value": "89,055"
                },
                {
                    "rawValue": 35.183794,
                    "value": "35.183794"
                },
                {
                    "rawValue": "–89.895397",
                    "value": "–89.895397"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fulton",
                    "value": "Fulton"
                },
                {
                    "rawValue": "88,397",
                    "value": "88,397"
                },
                {
                    "rawValue": 33.790034000000006,
                    "value": "33.790034000000006"
                },
                {
                    "rawValue": "–84.468182",
                    "value": "–84.468182"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "King",
                    "value": "King"
                },
                {
                    "rawValue": "85,598",
                    "value": "85,598"
                },
                {
                    "rawValue": 47.493553999999996,
                    "value": "47.493553999999996"
                },
                {
                    "rawValue": "–121.832375",
                    "value": "–121.832375"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Unknown",
                    "value": "Unknown"
                },
                {
                    "rawValue": "85,171",
                    "value": "85,171"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Essex",
                    "value": "Essex"
                },
                {
                    "rawValue": "85,100",
                    "value": "85,100"
                },
                {
                    "rawValue": 42.642711,
                    "value": "42.642711"
                },
                {
                    "rawValue": "–70.865107",
                    "value": "–70.865107"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Collin",
                    "value": "Collin"
                },
                {
                    "rawValue": "84,589",
                    "value": "84,589"
                },
                {
                    "rawValue": 33.193884999999995,
                    "value": "33.193884999999995"
                },
                {
                    "rawValue": "–96.578153",
                    "value": "–96.578153"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Providence",
                    "value": "Providence"
                },
                {
                    "rawValue": "84,529",
                    "value": "84,529"
                },
                {
                    "rawValue": 41.870488,
                    "value": "41.870488"
                },
                {
                    "rawValue": "–71.578242",
                    "value": "–71.578242"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fairfield",
                    "value": "Fairfield"
                },
                {
                    "rawValue": "82,772",
                    "value": "82,772"
                },
                {
                    "rawValue": 41.228103000000004,
                    "value": "41.228103000000004"
                },
                {
                    "rawValue": "–73.366757",
                    "value": "–73.366757"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oklahoma",
                    "value": "Oklahoma"
                },
                {
                    "rawValue": "82,107",
                    "value": "82,107"
                },
                {
                    "rawValue": 35.554611,
                    "value": "35.554611"
                },
                {
                    "rawValue": "–97.409401",
                    "value": "–97.409401"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Alameda",
                    "value": "Alameda"
                },
                {
                    "rawValue": "81,679",
                    "value": "81,679"
                },
                {
                    "rawValue": 37.648081,
                    "value": "37.648081"
                },
                {
                    "rawValue": "–121.913304",
                    "value": "–121.913304"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bergen",
                    "value": "Bergen"
                },
                {
                    "rawValue": "81,535",
                    "value": "81,535"
                },
                {
                    "rawValue": 40.95909,
                    "value": "40.95909"
                },
                {
                    "rawValue": "–74.074522",
                    "value": "–74.074522"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wake",
                    "value": "Wake"
                },
                {
                    "rawValue": "80,342",
                    "value": "80,342"
                },
                {
                    "rawValue": 35.789846000000004,
                    "value": "35.789846000000004"
                },
                {
                    "rawValue": "–78.650624",
                    "value": "–78.650624"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Suffolk",
                    "value": "Suffolk"
                },
                {
                    "rawValue": "80,026",
                    "value": "80,026"
                },
                {
                    "rawValue": 42.331959999999995,
                    "value": "42.331959999999995"
                },
                {
                    "rawValue": "–71.020173",
                    "value": "–71.020173"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hidalgo",
                    "value": "Hidalgo"
                },
                {
                    "rawValue": "79,380",
                    "value": "79,380"
                },
                {
                    "rawValue": 26.396384,
                    "value": "26.396384"
                },
                {
                    "rawValue": "–98.180990",
                    "value": "–98.180990"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Allegheny",
                    "value": "Allegheny"
                },
                {
                    "rawValue": "78,914",
                    "value": "78,914"
                },
                {
                    "rawValue": 40.468920000000004,
                    "value": "40.468920000000004"
                },
                {
                    "rawValue": "–79.980920",
                    "value": "–79.980920"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ventura",
                    "value": "Ventura"
                },
                {
                    "rawValue": "78,526",
                    "value": "78,526"
                },
                {
                    "rawValue": 34.358742,
                    "value": "34.358742"
                },
                {
                    "rawValue": "–119.133143",
                    "value": "–119.133143"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "DuPage",
                    "value": "DuPage"
                },
                {
                    "rawValue": "78,207",
                    "value": "78,207"
                },
                {
                    "rawValue": 41.852058,
                    "value": "41.852058"
                },
                {
                    "rawValue": "–88.086038",
                    "value": "–88.086038"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Travis",
                    "value": "Travis"
                },
                {
                    "rawValue": "77,082",
                    "value": "77,082"
                },
                {
                    "rawValue": 30.239513,
                    "value": "30.239513"
                },
                {
                    "rawValue": "–97.691270",
                    "value": "–97.691270"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oakland",
                    "value": "Oakland"
                },
                {
                    "rawValue": "76,649",
                    "value": "76,649"
                },
                {
                    "rawValue": 42.660452,
                    "value": "42.660452"
                },
                {
                    "rawValue": "–83.384210",
                    "value": "–83.384210"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Essex",
                    "value": "Essex"
                },
                {
                    "rawValue": "76,640",
                    "value": "76,640"
                },
                {
                    "rawValue": 40.787217,
                    "value": "40.787217"
                },
                {
                    "rawValue": "–74.246136",
                    "value": "–74.246136"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "75,480",
                    "value": "75,480"
                },
                {
                    "rawValue": 38.189533000000004,
                    "value": "38.189533000000004"
                },
                {
                    "rawValue": "–85.657624",
                    "value": "–85.657624"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Middlesex",
                    "value": "Middlesex"
                },
                {
                    "rawValue": "75,461",
                    "value": "75,461"
                },
                {
                    "rawValue": 40.439593,
                    "value": "40.439593"
                },
                {
                    "rawValue": "–74.407585",
                    "value": "–74.407585"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Prince George's",
                    "value": "Prince George's"
                },
                {
                    "rawValue": "74,733",
                    "value": "74,733"
                },
                {
                    "rawValue": 38.82588,
                    "value": "38.82588"
                },
                {
                    "rawValue": "–76.847272",
                    "value": "–76.847272"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hamilton",
                    "value": "Hamilton"
                },
                {
                    "rawValue": "74,226",
                    "value": "74,226"
                },
                {
                    "rawValue": 39.196927,
                    "value": "39.196927"
                },
                {
                    "rawValue": "–84.544187",
                    "value": "–84.544187"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "New Haven",
                    "value": "New Haven"
                },
                {
                    "rawValue": "74,020",
                    "value": "74,020"
                },
                {
                    "rawValue": 41.349717,
                    "value": "41.349717"
                },
                {
                    "rawValue": "–72.900204",
                    "value": "–72.900204"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hudson",
                    "value": "Hudson"
                },
                {
                    "rawValue": "72,300",
                    "value": "72,300"
                },
                {
                    "rawValue": 40.731384000000006,
                    "value": "40.731384000000006"
                },
                {
                    "rawValue": "–74.078627",
                    "value": "–74.078627"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "72,293",
                    "value": "72,293"
                },
                {
                    "rawValue": 33.553444,
                    "value": "33.553444"
                },
                {
                    "rawValue": "–86.896536",
                    "value": "–86.896536"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tulsa",
                    "value": "Tulsa"
                },
                {
                    "rawValue": "71,726",
                    "value": "71,726"
                },
                {
                    "rawValue": 36.120121000000005,
                    "value": "36.120121000000005"
                },
                {
                    "rawValue": "–95.941731",
                    "value": "–95.941731"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hartford",
                    "value": "Hartford"
                },
                {
                    "rawValue": "71,581",
                    "value": "71,581"
                },
                {
                    "rawValue": 41.806053000000006,
                    "value": "41.806053000000006"
                },
                {
                    "rawValue": "–72.732916",
                    "value": "–72.732916"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cobb",
                    "value": "Cobb"
                },
                {
                    "rawValue": "71,458",
                    "value": "71,458"
                },
                {
                    "rawValue": 33.93994,
                    "value": "33.93994"
                },
                {
                    "rawValue": "–84.574166",
                    "value": "–84.574166"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Denton",
                    "value": "Denton"
                },
                {
                    "rawValue": "68,852",
                    "value": "68,852"
                },
                {
                    "rawValue": 33.205005,
                    "value": "33.205005"
                },
                {
                    "rawValue": "–97.119046",
                    "value": "–97.119046"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pinellas",
                    "value": "Pinellas"
                },
                {
                    "rawValue": "68,258",
                    "value": "68,258"
                },
                {
                    "rawValue": 27.903121999999996,
                    "value": "27.903121999999996"
                },
                {
                    "rawValue": "–82.739518",
                    "value": "–82.739518"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fairfax",
                    "value": "Fairfax"
                },
                {
                    "rawValue": "68,069",
                    "value": "68,069"
                },
                {
                    "rawValue": 38.833743,
                    "value": "38.833743"
                },
                {
                    "rawValue": "–77.276117",
                    "value": "–77.276117"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Joaquin",
                    "value": "San Joaquin"
                },
                {
                    "rawValue": "67,754",
                    "value": "67,754"
                },
                {
                    "rawValue": 37.935034,
                    "value": "37.935034"
                },
                {
                    "rawValue": "–121.272237",
                    "value": "–121.272237"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Erie",
                    "value": "Erie"
                },
                {
                    "rawValue": "67,370",
                    "value": "67,370"
                },
                {
                    "rawValue": 42.752759000000005,
                    "value": "42.752759000000005"
                },
                {
                    "rawValue": "–78.778192",
                    "value": "–78.778192"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Worcester",
                    "value": "Worcester"
                },
                {
                    "rawValue": "66,895",
                    "value": "66,895"
                },
                {
                    "rawValue": 42.311693,
                    "value": "42.311693"
                },
                {
                    "rawValue": "–71.940282",
                    "value": "–71.940282"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Will",
                    "value": "Will"
                },
                {
                    "rawValue": "66,220",
                    "value": "66,220"
                },
                {
                    "rawValue": 41.448474,
                    "value": "41.448474"
                },
                {
                    "rawValue": "–87.978456",
                    "value": "–87.978456"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Greenville",
                    "value": "Greenville"
                },
                {
                    "rawValue": "65,559",
                    "value": "65,559"
                },
                {
                    "rawValue": 34.892645,
                    "value": "34.892645"
                },
                {
                    "rawValue": "–82.372077",
                    "value": "–82.372077"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Douglas",
                    "value": "Douglas"
                },
                {
                    "rawValue": "64,718",
                    "value": "64,718"
                },
                {
                    "rawValue": 41.297090999999995,
                    "value": "41.297090999999995"
                },
                {
                    "rawValue": "–96.154066",
                    "value": "–96.154066"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "64,318",
                    "value": "64,318"
                },
                {
                    "rawValue": 39.137382,
                    "value": "39.137382"
                },
                {
                    "rawValue": "–77.203063",
                    "value": "–77.203063"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Contra Costa",
                    "value": "Contra Costa"
                },
                {
                    "rawValue": "63,626",
                    "value": "63,626"
                },
                {
                    "rawValue": 37.919478999999995,
                    "value": "37.919478999999995"
                },
                {
                    "rawValue": "–121.951543",
                    "value": "–121.951543"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ocean",
                    "value": "Ocean"
                },
                {
                    "rawValue": "61,576",
                    "value": "61,576"
                },
                {
                    "rawValue": 39.86585,
                    "value": "39.86585"
                },
                {
                    "rawValue": "–74.263027",
                    "value": "–74.263027"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Macomb",
                    "value": "Macomb"
                },
                {
                    "rawValue": "61,331",
                    "value": "61,331"
                },
                {
                    "rawValue": 42.671467,
                    "value": "42.671467"
                },
                {
                    "rawValue": "–82.910869",
                    "value": "–82.910869"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Denver",
                    "value": "Denver"
                },
                {
                    "rawValue": "61,117",
                    "value": "61,117"
                },
                {
                    "rawValue": 39.761849,
                    "value": "39.761849"
                },
                {
                    "rawValue": "–104.880625",
                    "value": "–104.880625"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fort Bend",
                    "value": "Fort Bend"
                },
                {
                    "rawValue": "60,499",
                    "value": "60,499"
                },
                {
                    "rawValue": 29.526602,
                    "value": "29.526602"
                },
                {
                    "rawValue": "–95.771015",
                    "value": "–95.771015"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lake",
                    "value": "Lake"
                },
                {
                    "rawValue": "60,407",
                    "value": "60,407"
                },
                {
                    "rawValue": 42.326444,
                    "value": "42.326444"
                },
                {
                    "rawValue": "–87.436118",
                    "value": "–87.436118"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monmouth",
                    "value": "Monmouth"
                },
                {
                    "rawValue": "60,229",
                    "value": "60,229"
                },
                {
                    "rawValue": 40.287056,
                    "value": "40.287056"
                },
                {
                    "rawValue": "–74.152446",
                    "value": "–74.152446"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lee",
                    "value": "Lee"
                },
                {
                    "rawValue": "59,219",
                    "value": "59,219"
                },
                {
                    "rawValue": 26.552134000000002,
                    "value": "26.552134000000002"
                },
                {
                    "rawValue": "–81.892250",
                    "value": "–81.892250"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Passaic",
                    "value": "Passaic"
                },
                {
                    "rawValue": "58,987",
                    "value": "58,987"
                },
                {
                    "rawValue": 41.033763,
                    "value": "41.033763"
                },
                {
                    "rawValue": "–74.300308",
                    "value": "–74.300308"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Union",
                    "value": "Union"
                },
                {
                    "rawValue": "58,936",
                    "value": "58,936"
                },
                {
                    "rawValue": 40.659871,
                    "value": "40.659871"
                },
                {
                    "rawValue": "–74.308696",
                    "value": "–74.308696"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "DeKalb",
                    "value": "DeKalb"
                },
                {
                    "rawValue": "58,848",
                    "value": "58,848"
                },
                {
                    "rawValue": 33.770661,
                    "value": "33.770661"
                },
                {
                    "rawValue": "–84.226343",
                    "value": "–84.226343"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Polk",
                    "value": "Polk"
                },
                {
                    "rawValue": "58,434",
                    "value": "58,434"
                },
                {
                    "rawValue": 27.953115000000004,
                    "value": "27.953115000000004"
                },
                {
                    "rawValue": "–81.692783",
                    "value": "–81.692783"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stanislaus",
                    "value": "Stanislaus"
                },
                {
                    "rawValue": "57,124",
                    "value": "57,124"
                },
                {
                    "rawValue": 37.562384,
                    "value": "37.562384"
                },
                {
                    "rawValue": "–121.002656",
                    "value": "–121.002656"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bristol",
                    "value": "Bristol"
                },
                {
                    "rawValue": "56,686",
                    "value": "56,686"
                },
                {
                    "rawValue": 41.748576,
                    "value": "41.748576"
                },
                {
                    "rawValue": "–71.087062",
                    "value": "–71.087062"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "55,594",
                    "value": "55,594"
                },
                {
                    "rawValue": 40.209998999999996,
                    "value": "40.209998999999996"
                },
                {
                    "rawValue": "–75.370201",
                    "value": "–75.370201"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Johnson",
                    "value": "Johnson"
                },
                {
                    "rawValue": "55,084",
                    "value": "55,084"
                },
                {
                    "rawValue": 38.883907,
                    "value": "38.883907"
                },
                {
                    "rawValue": "–94.822330",
                    "value": "–94.822330"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sedgwick",
                    "value": "Sedgwick"
                },
                {
                    "rawValue": "54,195",
                    "value": "54,195"
                },
                {
                    "rawValue": 37.683807,
                    "value": "37.683807"
                },
                {
                    "rawValue": "–97.459451",
                    "value": "–97.459451"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "53,676",
                    "value": "53,676"
                },
                {
                    "rawValue": 43.464475,
                    "value": "43.464475"
                },
                {
                    "rawValue": "–77.664656",
                    "value": "–77.664656"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "El Paso",
                    "value": "El Paso"
                },
                {
                    "rawValue": "53,373",
                    "value": "53,373"
                },
                {
                    "rawValue": 38.827383000000005,
                    "value": "38.827383000000005"
                },
                {
                    "rawValue": "–104.527472",
                    "value": "–104.527472"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bernalillo",
                    "value": "Bernalillo"
                },
                {
                    "rawValue": "53,321",
                    "value": "53,321"
                },
                {
                    "rawValue": 35.054002000000004,
                    "value": "35.054002000000004"
                },
                {
                    "rawValue": "–106.669065",
                    "value": "–106.669065"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kent",
                    "value": "Kent"
                },
                {
                    "rawValue": "52,616",
                    "value": "52,616"
                },
                {
                    "rawValue": 43.032497,
                    "value": "43.032497"
                },
                {
                    "rawValue": "–85.547446",
                    "value": "–85.547446"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Polk",
                    "value": "Polk"
                },
                {
                    "rawValue": "52,497",
                    "value": "52,497"
                },
                {
                    "rawValue": 41.684281,
                    "value": "41.684281"
                },
                {
                    "rawValue": "–93.569720",
                    "value": "–93.569720"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Baltimore",
                    "value": "Baltimore"
                },
                {
                    "rawValue": "52,130",
                    "value": "52,130"
                },
                {
                    "rawValue": 39.443166999999995,
                    "value": "39.443166999999995"
                },
                {
                    "rawValue": "–76.616569",
                    "value": "–76.616569"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kane",
                    "value": "Kane"
                },
                {
                    "rawValue": "51,415",
                    "value": "51,415"
                },
                {
                    "rawValue": 41.939594,
                    "value": "41.939594"
                },
                {
                    "rawValue": "–88.428040",
                    "value": "–88.428040"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "New Castle",
                    "value": "New Castle"
                },
                {
                    "rawValue": "50,991",
                    "value": "50,991"
                },
                {
                    "rawValue": 39.575915,
                    "value": "39.575915"
                },
                {
                    "rawValue": "–75.644132",
                    "value": "–75.644132"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Arapahoe",
                    "value": "Arapahoe"
                },
                {
                    "rawValue": "50,521",
                    "value": "50,521"
                },
                {
                    "rawValue": 39.644632,
                    "value": "39.644632"
                },
                {
                    "rawValue": "–104.331733",
                    "value": "–104.331733"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Adams",
                    "value": "Adams"
                },
                {
                    "rawValue": "50,310",
                    "value": "50,310"
                },
                {
                    "rawValue": 39.874325,
                    "value": "39.874325"
                },
                {
                    "rawValue": "–104.331872",
                    "value": "–104.331872"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lake",
                    "value": "Lake"
                },
                {
                    "rawValue": "48,913",
                    "value": "48,913"
                },
                {
                    "rawValue": 41.472239,
                    "value": "41.472239"
                },
                {
                    "rawValue": "–87.374337",
                    "value": "–87.374337"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tulare",
                    "value": "Tulare"
                },
                {
                    "rawValue": "48,432",
                    "value": "48,432"
                },
                {
                    "rawValue": 36.230453000000004,
                    "value": "36.230453000000004"
                },
                {
                    "rawValue": "–118.780542",
                    "value": "–118.780542"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lubbock",
                    "value": "Lubbock"
                },
                {
                    "rawValue": "48,301",
                    "value": "48,301"
                },
                {
                    "rawValue": 33.611469,
                    "value": "33.611469"
                },
                {
                    "rawValue": "–101.819944",
                    "value": "–101.819944"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Knox",
                    "value": "Knox"
                },
                {
                    "rawValue": "47,796",
                    "value": "47,796"
                },
                {
                    "rawValue": 35.992727,
                    "value": "35.992727"
                },
                {
                    "rawValue": "–83.937721",
                    "value": "–83.937721"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "47,674",
                    "value": "47,674"
                },
                {
                    "rawValue": 39.755218,
                    "value": "39.755218"
                },
                {
                    "rawValue": "–84.290546",
                    "value": "–84.290546"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ada",
                    "value": "Ada"
                },
                {
                    "rawValue": "47,566",
                    "value": "47,566"
                },
                {
                    "rawValue": 43.447860999999996,
                    "value": "43.447860999999996"
                },
                {
                    "rawValue": "–116.244456",
                    "value": "–116.244456"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pinal",
                    "value": "Pinal"
                },
                {
                    "rawValue": "47,093",
                    "value": "47,093"
                },
                {
                    "rawValue": 32.91891,
                    "value": "32.91891"
                },
                {
                    "rawValue": "–111.367257",
                    "value": "–111.367257"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "46,794",
                    "value": "46,794"
                },
                {
                    "rawValue": 30.302364,
                    "value": "30.302364"
                },
                {
                    "rawValue": "–95.503523",
                    "value": "–95.503523"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Norfolk",
                    "value": "Norfolk"
                },
                {
                    "rawValue": "46,641",
                    "value": "46,641"
                },
                {
                    "rawValue": 42.169703000000005,
                    "value": "42.169703000000005"
                },
                {
                    "rawValue": "–71.179875",
                    "value": "–71.179875"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bucks",
                    "value": "Bucks"
                },
                {
                    "rawValue": "46,559",
                    "value": "46,559"
                },
                {
                    "rawValue": 40.336887,
                    "value": "40.336887"
                },
                {
                    "rawValue": "–75.107060",
                    "value": "–75.107060"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Camden",
                    "value": "Camden"
                },
                {
                    "rawValue": "45,363",
                    "value": "45,363"
                },
                {
                    "rawValue": 39.802352,
                    "value": "39.802352"
                },
                {
                    "rawValue": "–74.961251",
                    "value": "–74.961251"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Waukesha",
                    "value": "Waukesha"
                },
                {
                    "rawValue": "45,269",
                    "value": "45,269"
                },
                {
                    "rawValue": 43.019308,
                    "value": "43.019308"
                },
                {
                    "rawValue": "–88.306707",
                    "value": "–88.306707"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lancaster",
                    "value": "Lancaster"
                },
                {
                    "rawValue": "44,833",
                    "value": "44,833"
                },
                {
                    "rawValue": 40.041992,
                    "value": "40.041992"
                },
                {
                    "rawValue": "–76.250198",
                    "value": "–76.250198"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "44,364",
                    "value": "44,364"
                },
                {
                    "rawValue": 29.5033,
                    "value": "29.5033"
                },
                {
                    "rawValue": "–90.036231",
                    "value": "–90.036231"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ramsey",
                    "value": "Ramsey"
                },
                {
                    "rawValue": "43,616",
                    "value": "43,616"
                },
                {
                    "rawValue": 45.01525,
                    "value": "45.01525"
                },
                {
                    "rawValue": "–93.100141",
                    "value": "–93.100141"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washoe",
                    "value": "Washoe"
                },
                {
                    "rawValue": "43,312",
                    "value": "43,312"
                },
                {
                    "rawValue": 40.703311,
                    "value": "40.703311"
                },
                {
                    "rawValue": "–119.710315",
                    "value": "–119.710315"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Webb",
                    "value": "Webb"
                },
                {
                    "rawValue": "42,913",
                    "value": "42,913"
                },
                {
                    "rawValue": 27.770584000000003,
                    "value": "27.770584000000003"
                },
                {
                    "rawValue": "–99.326641",
                    "value": "–99.326641"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hampden",
                    "value": "Hampden"
                },
                {
                    "rawValue": "42,911",
                    "value": "42,911"
                },
                {
                    "rawValue": 42.136198,
                    "value": "42.136198"
                },
                {
                    "rawValue": "–72.635648",
                    "value": "–72.635648"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dane",
                    "value": "Dane"
                },
                {
                    "rawValue": "42,626",
                    "value": "42,626"
                },
                {
                    "rawValue": 43.067468,
                    "value": "43.067468"
                },
                {
                    "rawValue": "–89.417852",
                    "value": "–89.417852"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monterey",
                    "value": "Monterey"
                },
                {
                    "rawValue": "42,508",
                    "value": "42,508"
                },
                {
                    "rawValue": 36.240107,
                    "value": "36.240107"
                },
                {
                    "rawValue": "–121.315573",
                    "value": "–121.315573"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Richland",
                    "value": "Richland"
                },
                {
                    "rawValue": "42,136",
                    "value": "42,136"
                },
                {
                    "rawValue": 34.029783,
                    "value": "34.029783"
                },
                {
                    "rawValue": "–80.896566",
                    "value": "–80.896566"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Delaware",
                    "value": "Delaware"
                },
                {
                    "rawValue": "42,015",
                    "value": "42,015"
                },
                {
                    "rawValue": 39.91667,
                    "value": "39.91667"
                },
                {
                    "rawValue": "–75.398786",
                    "value": "–75.398786"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "District of Columbia",
                    "value": "District of Columbia"
                },
                {
                    "rawValue": "42,006",
                    "value": "42,006"
                },
                {
                    "rawValue": 38.904149,
                    "value": "38.904149"
                },
                {
                    "rawValue": "–77.017094",
                    "value": "–77.017094"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Williamson",
                    "value": "Williamson"
                },
                {
                    "rawValue": "41,649",
                    "value": "41,649"
                },
                {
                    "rawValue": 30.64903,
                    "value": "30.64903"
                },
                {
                    "rawValue": "–97.605069",
                    "value": "–97.605069"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kansas City",
                    "value": "Kansas City"
                },
                {
                    "rawValue": "41,629",
                    "value": "41,629"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hamilton",
                    "value": "Hamilton"
                },
                {
                    "rawValue": "41,237",
                    "value": "41,237"
                },
                {
                    "rawValue": 35.159186,
                    "value": "35.159186"
                },
                {
                    "rawValue": "–85.202296",
                    "value": "–85.202296"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Baltimore city",
                    "value": "Baltimore city"
                },
                {
                    "rawValue": "41,214",
                    "value": "41,214"
                },
                {
                    "rawValue": 39.300214000000004,
                    "value": "39.300214000000004"
                },
                {
                    "rawValue": "–76.610516",
                    "value": "–76.610516"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Plymouth",
                    "value": "Plymouth"
                },
                {
                    "rawValue": "41,187",
                    "value": "41,187"
                },
                {
                    "rawValue": 41.987196000000004,
                    "value": "41.987196000000004"
                },
                {
                    "rawValue": "–70.741942",
                    "value": "–70.741942"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Summit",
                    "value": "Summit"
                },
                {
                    "rawValue": "40,985",
                    "value": "40,985"
                },
                {
                    "rawValue": 41.121851,
                    "value": "41.121851"
                },
                {
                    "rawValue": "–81.534936",
                    "value": "–81.534936"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Guilford",
                    "value": "Guilford"
                },
                {
                    "rawValue": "40,744",
                    "value": "40,744"
                },
                {
                    "rawValue": 36.079065,
                    "value": "36.079065"
                },
                {
                    "rawValue": "–79.788665",
                    "value": "–79.788665"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rockland",
                    "value": "Rockland"
                },
                {
                    "rawValue": "40,203",
                    "value": "40,203"
                },
                {
                    "rawValue": 41.154785,
                    "value": "41.154785"
                },
                {
                    "rawValue": "–74.024772",
                    "value": "–74.024772"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Prince William",
                    "value": "Prince William"
                },
                {
                    "rawValue": "40,115",
                    "value": "40,115"
                },
                {
                    "rawValue": 38.702332,
                    "value": "38.702332"
                },
                {
                    "rawValue": "–77.478887",
                    "value": "–77.478887"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Charles",
                    "value": "St. Charles"
                },
                {
                    "rawValue": "39,977",
                    "value": "39,977"
                },
                {
                    "rawValue": 38.781102000000004,
                    "value": "38.781102000000004"
                },
                {
                    "rawValue": "–90.674915",
                    "value": "–90.674915"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Morris",
                    "value": "Morris"
                },
                {
                    "rawValue": "39,575",
                    "value": "39,575"
                },
                {
                    "rawValue": 40.858581,
                    "value": "40.858581"
                },
                {
                    "rawValue": "–74.547427",
                    "value": "–74.547427"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Mateo",
                    "value": "San Mateo"
                },
                {
                    "rawValue": "39,535",
                    "value": "39,535"
                },
                {
                    "rawValue": 37.414664,
                    "value": "37.414664"
                },
                {
                    "rawValue": "–122.371542",
                    "value": "–122.371542"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pierce",
                    "value": "Pierce"
                },
                {
                    "rawValue": "39,491",
                    "value": "39,491"
                },
                {
                    "rawValue": 47.040715999999996,
                    "value": "47.040715999999996"
                },
                {
                    "rawValue": "–122.144709",
                    "value": "–122.144709"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rutherford",
                    "value": "Rutherford"
                },
                {
                    "rawValue": "39,067",
                    "value": "39,067"
                },
                {
                    "rawValue": 35.843369,
                    "value": "35.843369"
                },
                {
                    "rawValue": "–86.417213",
                    "value": "–86.417213"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Charleston",
                    "value": "Charleston"
                },
                {
                    "rawValue": "38,914",
                    "value": "38,914"
                },
                {
                    "rawValue": 32.800458,
                    "value": "32.800458"
                },
                {
                    "rawValue": "–79.942480",
                    "value": "–79.942480"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orange",
                    "value": "Orange"
                },
                {
                    "rawValue": "38,675",
                    "value": "38,675"
                },
                {
                    "rawValue": 41.402409999999996,
                    "value": "41.402409999999996"
                },
                {
                    "rawValue": "–74.306252",
                    "value": "–74.306252"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Nueces",
                    "value": "Nueces"
                },
                {
                    "rawValue": "38,330",
                    "value": "38,330"
                },
                {
                    "rawValue": 27.739406,
                    "value": "27.739406"
                },
                {
                    "rawValue": "–97.521643",
                    "value": "–97.521643"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "38,265",
                    "value": "38,265"
                },
                {
                    "rawValue": 39.586459999999995,
                    "value": "39.586459999999995"
                },
                {
                    "rawValue": "–105.245601",
                    "value": "–105.245601"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Spokane",
                    "value": "Spokane"
                },
                {
                    "rawValue": "37,818",
                    "value": "37,818"
                },
                {
                    "rawValue": 47.620379,
                    "value": "47.620379"
                },
                {
                    "rawValue": "–117.404392",
                    "value": "–117.404392"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cameron",
                    "value": "Cameron"
                },
                {
                    "rawValue": "37,780",
                    "value": "37,780"
                },
                {
                    "rawValue": 26.102923,
                    "value": "26.102923"
                },
                {
                    "rawValue": "–97.478958",
                    "value": "–97.478958"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pulaski",
                    "value": "Pulaski"
                },
                {
                    "rawValue": "37,726",
                    "value": "37,726"
                },
                {
                    "rawValue": 34.773988,
                    "value": "34.773988"
                },
                {
                    "rawValue": "–92.316515",
                    "value": "–92.316515"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Osceola",
                    "value": "Osceola"
                },
                {
                    "rawValue": "37,724",
                    "value": "37,724"
                },
                {
                    "rawValue": 28.059027,
                    "value": "28.059027"
                },
                {
                    "rawValue": "–81.139312",
                    "value": "–81.139312"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dakota",
                    "value": "Dakota"
                },
                {
                    "rawValue": "36,927",
                    "value": "36,927"
                },
                {
                    "rawValue": 44.670893,
                    "value": "44.670893"
                },
                {
                    "rawValue": "–93.062481",
                    "value": "–93.062481"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Spartanburg",
                    "value": "Spartanburg"
                },
                {
                    "rawValue": "36,809",
                    "value": "36,809"
                },
                {
                    "rawValue": 34.933239,
                    "value": "34.933239"
                },
                {
                    "rawValue": "–81.991053",
                    "value": "–81.991053"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "York",
                    "value": "York"
                },
                {
                    "rawValue": "36,669",
                    "value": "36,669"
                },
                {
                    "rawValue": 39.921839,
                    "value": "39.921839"
                },
                {
                    "rawValue": "–76.728446",
                    "value": "–76.728446"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Berks",
                    "value": "Berks"
                },
                {
                    "rawValue": "36,611",
                    "value": "36,611"
                },
                {
                    "rawValue": 40.413957,
                    "value": "40.413957"
                },
                {
                    "rawValue": "–75.926860",
                    "value": "–75.926860"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Burlington",
                    "value": "Burlington"
                },
                {
                    "rawValue": "36,584",
                    "value": "36,584"
                },
                {
                    "rawValue": 39.875786,
                    "value": "39.875786"
                },
                {
                    "rawValue": "–74.663006",
                    "value": "–74.663006"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Yuma",
                    "value": "Yuma"
                },
                {
                    "rawValue": "36,581",
                    "value": "36,581"
                },
                {
                    "rawValue": 32.773942,
                    "value": "32.773942"
                },
                {
                    "rawValue": "–113.910905",
                    "value": "–113.910905"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Anne Arundel",
                    "value": "Anne Arundel"
                },
                {
                    "rawValue": "36,557",
                    "value": "36,557"
                },
                {
                    "rawValue": 38.993373999999996,
                    "value": "38.993373999999996"
                },
                {
                    "rawValue": "–76.560511",
                    "value": "–76.560511"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mobile",
                    "value": "Mobile"
                },
                {
                    "rawValue": "36,525",
                    "value": "36,525"
                },
                {
                    "rawValue": 30.684572999999997,
                    "value": "30.684572999999997"
                },
                {
                    "rawValue": "–88.196568",
                    "value": "–88.196568"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "36,463",
                    "value": "36,463"
                },
                {
                    "rawValue": 39.007233,
                    "value": "39.007233"
                },
                {
                    "rawValue": "–94.342507",
                    "value": "–94.342507"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Allen",
                    "value": "Allen"
                },
                {
                    "rawValue": "36,376",
                    "value": "36,376"
                },
                {
                    "rawValue": 41.091854999999995,
                    "value": "41.091854999999995"
                },
                {
                    "rawValue": "–85.072230",
                    "value": "–85.072230"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "East Baton Rouge",
                    "value": "East Baton Rouge"
                },
                {
                    "rawValue": "36,232",
                    "value": "36,232"
                },
                {
                    "rawValue": 30.544002000000003,
                    "value": "30.544002000000003"
                },
                {
                    "rawValue": "–91.093174",
                    "value": "–91.093174"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lucas",
                    "value": "Lucas"
                },
                {
                    "rawValue": "36,060",
                    "value": "36,060"
                },
                {
                    "rawValue": 41.682321,
                    "value": "41.682321"
                },
                {
                    "rawValue": "–83.468867",
                    "value": "–83.468867"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Butler",
                    "value": "Butler"
                },
                {
                    "rawValue": "36,021",
                    "value": "36,021"
                },
                {
                    "rawValue": 39.439915,
                    "value": "39.439915"
                },
                {
                    "rawValue": "–84.565397",
                    "value": "–84.565397"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Galveston",
                    "value": "Galveston"
                },
                {
                    "rawValue": "35,597",
                    "value": "35,597"
                },
                {
                    "rawValue": 29.228706,
                    "value": "29.228706"
                },
                {
                    "rawValue": "–94.894865",
                    "value": "–94.894865"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Volusia",
                    "value": "Volusia"
                },
                {
                    "rawValue": "35,473",
                    "value": "35,473"
                },
                {
                    "rawValue": 29.057616999999997,
                    "value": "29.057616999999997"
                },
                {
                    "rawValue": "–81.161813",
                    "value": "–81.161813"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Horry",
                    "value": "Horry"
                },
                {
                    "rawValue": "35,355",
                    "value": "35,355"
                },
                {
                    "rawValue": 33.909269,
                    "value": "33.909269"
                },
                {
                    "rawValue": "–78.976675",
                    "value": "–78.976675"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Davis",
                    "value": "Davis"
                },
                {
                    "rawValue": "35,247",
                    "value": "35,247"
                },
                {
                    "rawValue": 41.037045,
                    "value": "41.037045"
                },
                {
                    "rawValue": "–112.202123",
                    "value": "–112.202123"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Brevard",
                    "value": "Brevard"
                },
                {
                    "rawValue": "35,081",
                    "value": "35,081"
                },
                {
                    "rawValue": 28.298276,
                    "value": "28.298276"
                },
                {
                    "rawValue": "–80.700384",
                    "value": "–80.700384"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Francisco",
                    "value": "San Francisco"
                },
                {
                    "rawValue": "34,657",
                    "value": "34,657"
                },
                {
                    "rawValue": 37.727239000000004,
                    "value": "37.727239000000004"
                },
                {
                    "rawValue": "–123.032229",
                    "value": "–123.032229"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pasco",
                    "value": "Pasco"
                },
                {
                    "rawValue": "34,271",
                    "value": "34,271"
                },
                {
                    "rawValue": 28.302024,
                    "value": "28.302024"
                },
                {
                    "rawValue": "–82.455707",
                    "value": "–82.455707"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Escambia",
                    "value": "Escambia"
                },
                {
                    "rawValue": "34,268",
                    "value": "34,268"
                },
                {
                    "rawValue": 30.611664,
                    "value": "30.611664"
                },
                {
                    "rawValue": "–87.339040",
                    "value": "–87.339040"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Brazoria",
                    "value": "Brazoria"
                },
                {
                    "rawValue": "33,943",
                    "value": "33,943"
                },
                {
                    "rawValue": 29.167818,
                    "value": "29.167818"
                },
                {
                    "rawValue": "–95.434647",
                    "value": "–95.434647"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Anoka",
                    "value": "Anoka"
                },
                {
                    "rawValue": "33,703",
                    "value": "33,703"
                },
                {
                    "rawValue": 45.27411,
                    "value": "45.27411"
                },
                {
                    "rawValue": "–93.242723",
                    "value": "–93.242723"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fayette",
                    "value": "Fayette"
                },
                {
                    "rawValue": "33,170",
                    "value": "33,170"
                },
                {
                    "rawValue": 38.040157,
                    "value": "38.040157"
                },
                {
                    "rawValue": "–84.458443",
                    "value": "–84.458443"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Brown",
                    "value": "Brown"
                },
                {
                    "rawValue": "33,043",
                    "value": "33,043"
                },
                {
                    "rawValue": 44.473960999999996,
                    "value": "44.473960999999996"
                },
                {
                    "rawValue": "–87.995926",
                    "value": "–87.995926"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Onondaga",
                    "value": "Onondaga"
                },
                {
                    "rawValue": "32,941",
                    "value": "32,941"
                },
                {
                    "rawValue": 43.00653,
                    "value": "43.00653"
                },
                {
                    "rawValue": "–76.196117",
                    "value": "–76.196117"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Manatee",
                    "value": "Manatee"
                },
                {
                    "rawValue": "32,910",
                    "value": "32,910"
                },
                {
                    "rawValue": 27.481385999999997,
                    "value": "27.481385999999997"
                },
                {
                    "rawValue": "–82.365784",
                    "value": "–82.365784"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "32,786",
                    "value": "32,786"
                },
                {
                    "rawValue": 34.764238,
                    "value": "34.764238"
                },
                {
                    "rawValue": "–86.551080",
                    "value": "–86.551080"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hamilton",
                    "value": "Hamilton"
                },
                {
                    "rawValue": "32,631",
                    "value": "32,631"
                },
                {
                    "rawValue": 40.04987,
                    "value": "40.04987"
                },
                {
                    "rawValue": "–86.020586",
                    "value": "–86.020586"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Santa Barbara",
                    "value": "Santa Barbara"
                },
                {
                    "rawValue": "32,474",
                    "value": "32,474"
                },
                {
                    "rawValue": 34.537378000000004,
                    "value": "34.537378000000004"
                },
                {
                    "rawValue": "–120.038485",
                    "value": "–120.038485"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Forsyth",
                    "value": "Forsyth"
                },
                {
                    "rawValue": "32,391",
                    "value": "32,391"
                },
                {
                    "rawValue": 36.131667,
                    "value": "36.131667"
                },
                {
                    "rawValue": "–80.257289",
                    "value": "–80.257289"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Multnomah",
                    "value": "Multnomah"
                },
                {
                    "rawValue": "32,231",
                    "value": "32,231"
                },
                {
                    "rawValue": 45.547693,
                    "value": "45.547693"
                },
                {
                    "rawValue": "–122.417173",
                    "value": "–122.417173"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Snohomish",
                    "value": "Snohomish"
                },
                {
                    "rawValue": "31,510",
                    "value": "31,510"
                },
                {
                    "rawValue": 48.054913,
                    "value": "48.054913"
                },
                {
                    "rawValue": "–121.766412",
                    "value": "–121.766412"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lehigh",
                    "value": "Lehigh"
                },
                {
                    "rawValue": "31,470",
                    "value": "31,470"
                },
                {
                    "rawValue": 40.614241,
                    "value": "40.614241"
                },
                {
                    "rawValue": "–75.590627",
                    "value": "–75.590627"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chester",
                    "value": "Chester"
                },
                {
                    "rawValue": "31,460",
                    "value": "31,460"
                },
                {
                    "rawValue": 39.973965,
                    "value": "39.973965"
                },
                {
                    "rawValue": "–75.749732",
                    "value": "–75.749732"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Virginia Beach city",
                    "value": "Virginia Beach city"
                },
                {
                    "rawValue": "31,423",
                    "value": "31,423"
                },
                {
                    "rawValue": 36.779322,
                    "value": "36.779322"
                },
                {
                    "rawValue": "–76.024020",
                    "value": "–76.024020"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Collier",
                    "value": "Collier"
                },
                {
                    "rawValue": "30,990",
                    "value": "30,990"
                },
                {
                    "rawValue": 26.118713,
                    "value": "26.118713"
                },
                {
                    "rawValue": "–81.400884",
                    "value": "–81.400884"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Joseph",
                    "value": "St. Joseph"
                },
                {
                    "rawValue": "30,576",
                    "value": "30,576"
                },
                {
                    "rawValue": 41.617699,
                    "value": "41.617699"
                },
                {
                    "rawValue": "–86.288159",
                    "value": "–86.288159"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Solano",
                    "value": "Solano"
                },
                {
                    "rawValue": "30,458",
                    "value": "30,458"
                },
                {
                    "rawValue": 38.267226,
                    "value": "38.267226"
                },
                {
                    "rawValue": "–121.939594",
                    "value": "–121.939594"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lexington",
                    "value": "Lexington"
                },
                {
                    "rawValue": "30,416",
                    "value": "30,416"
                },
                {
                    "rawValue": 33.892554,
                    "value": "33.892554"
                },
                {
                    "rawValue": "–81.272853",
                    "value": "–81.272853"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stark",
                    "value": "Stark"
                },
                {
                    "rawValue": "29,723",
                    "value": "29,723"
                },
                {
                    "rawValue": 40.814131,
                    "value": "40.814131"
                },
                {
                    "rawValue": "–81.365667",
                    "value": "–81.365667"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "29,710",
                    "value": "29,710"
                },
                {
                    "rawValue": 35.971209,
                    "value": "35.971209"
                },
                {
                    "rawValue": "–94.218417",
                    "value": "–94.218417"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Merced",
                    "value": "Merced"
                },
                {
                    "rawValue": "29,643",
                    "value": "29,643"
                },
                {
                    "rawValue": 37.194806,
                    "value": "37.194806"
                },
                {
                    "rawValue": "–120.722802",
                    "value": "–120.722802"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Leon",
                    "value": "Leon"
                },
                {
                    "rawValue": "29,621",
                    "value": "29,621"
                },
                {
                    "rawValue": 30.45931,
                    "value": "30.45931"
                },
                {
                    "rawValue": "–84.277800",
                    "value": "–84.277800"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hillsborough",
                    "value": "Hillsborough"
                },
                {
                    "rawValue": "29,181",
                    "value": "29,181"
                },
                {
                    "rawValue": 42.911643,
                    "value": "42.911643"
                },
                {
                    "rawValue": "–71.723101",
                    "value": "–71.723101"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cleveland",
                    "value": "Cleveland"
                },
                {
                    "rawValue": "29,059",
                    "value": "29,059"
                },
                {
                    "rawValue": 35.203117,
                    "value": "35.203117"
                },
                {
                    "rawValue": "–97.328332",
                    "value": "–97.328332"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orleans",
                    "value": "Orleans"
                },
                {
                    "rawValue": "28,802",
                    "value": "28,802"
                },
                {
                    "rawValue": 30.068635999999998,
                    "value": "30.068635999999998"
                },
                {
                    "rawValue": "–89.939007",
                    "value": "–89.939007"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mercer",
                    "value": "Mercer"
                },
                {
                    "rawValue": "28,685",
                    "value": "28,685"
                },
                {
                    "rawValue": 40.282503000000005,
                    "value": "40.282503000000005"
                },
                {
                    "rawValue": "–74.703724",
                    "value": "–74.703724"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lancaster",
                    "value": "Lancaster"
                },
                {
                    "rawValue": "28,670",
                    "value": "28,670"
                },
                {
                    "rawValue": 40.783547,
                    "value": "40.783547"
                },
                {
                    "rawValue": "–96.688658",
                    "value": "–96.688658"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sonoma",
                    "value": "Sonoma"
                },
                {
                    "rawValue": "28,601",
                    "value": "28,601"
                },
                {
                    "rawValue": 38.532574,
                    "value": "38.532574"
                },
                {
                    "rawValue": "–122.945194",
                    "value": "–122.945194"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Clair",
                    "value": "St. Clair"
                },
                {
                    "rawValue": "28,533",
                    "value": "28,533"
                },
                {
                    "rawValue": 38.470197999999996,
                    "value": "38.470197999999996"
                },
                {
                    "rawValue": "–89.928546",
                    "value": "–89.928546"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Winnebago",
                    "value": "Winnebago"
                },
                {
                    "rawValue": "28,502",
                    "value": "28,502"
                },
                {
                    "rawValue": 42.337396000000005,
                    "value": "42.337396000000005"
                },
                {
                    "rawValue": "–89.161205",
                    "value": "–89.161205"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Minnehaha",
                    "value": "Minnehaha"
                },
                {
                    "rawValue": "28,449",
                    "value": "28,449"
                },
                {
                    "rawValue": 43.667472,
                    "value": "43.667472"
                },
                {
                    "rawValue": "–96.795726",
                    "value": "–96.795726"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "28,360",
                    "value": "28,360"
                },
                {
                    "rawValue": 38.827082,
                    "value": "38.827082"
                },
                {
                    "rawValue": "–89.900195",
                    "value": "–89.900195"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cherokee",
                    "value": "Cherokee"
                },
                {
                    "rawValue": "28,332",
                    "value": "28,332"
                },
                {
                    "rawValue": 34.244316999999995,
                    "value": "34.244316999999995"
                },
                {
                    "rawValue": "–84.475057",
                    "value": "–84.475057"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marion",
                    "value": "Marion"
                },
                {
                    "rawValue": "28,193",
                    "value": "28,193"
                },
                {
                    "rawValue": 29.202804999999998,
                    "value": "29.202804999999998"
                },
                {
                    "rawValue": "–82.043100",
                    "value": "–82.043100"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Yakima",
                    "value": "Yakima"
                },
                {
                    "rawValue": "28,118",
                    "value": "28,118"
                },
                {
                    "rawValue": 46.456558,
                    "value": "46.456558"
                },
                {
                    "rawValue": "–120.740145",
                    "value": "–120.740145"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Seminole",
                    "value": "Seminole"
                },
                {
                    "rawValue": "28,028",
                    "value": "28,028"
                },
                {
                    "rawValue": 28.690078999999997,
                    "value": "28.690078999999997"
                },
                {
                    "rawValue": "–81.131980",
                    "value": "–81.131980"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Greene",
                    "value": "Greene"
                },
                {
                    "rawValue": "27,909",
                    "value": "27,909"
                },
                {
                    "rawValue": 37.258196000000005,
                    "value": "37.258196000000005"
                },
                {
                    "rawValue": "–93.340641",
                    "value": "–93.340641"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sarasota",
                    "value": "Sarasota"
                },
                {
                    "rawValue": "27,728",
                    "value": "27,728"
                },
                {
                    "rawValue": 27.184386,
                    "value": "27.184386"
                },
                {
                    "rawValue": "–82.365835",
                    "value": "–82.365835"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Northampton",
                    "value": "Northampton"
                },
                {
                    "rawValue": "27,650",
                    "value": "27,650"
                },
                {
                    "rawValue": 40.752790999999995,
                    "value": "40.752790999999995"
                },
                {
                    "rawValue": "–75.307447",
                    "value": "–75.307447"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Benton",
                    "value": "Benton"
                },
                {
                    "rawValue": "27,608",
                    "value": "27,608"
                },
                {
                    "rawValue": 36.337825,
                    "value": "36.337825"
                },
                {
                    "rawValue": "–94.256187",
                    "value": "–94.256187"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Westmoreland",
                    "value": "Westmoreland"
                },
                {
                    "rawValue": "27,369",
                    "value": "27,369"
                },
                {
                    "rawValue": 40.311068,
                    "value": "40.311068"
                },
                {
                    "rawValue": "–79.466688",
                    "value": "–79.466688"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "York",
                    "value": "York"
                },
                {
                    "rawValue": "27,238",
                    "value": "27,238"
                },
                {
                    "rawValue": 34.97019,
                    "value": "34.97019"
                },
                {
                    "rawValue": "–81.183189",
                    "value": "–81.183189"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Imperial",
                    "value": "Imperial"
                },
                {
                    "rawValue": "27,045",
                    "value": "27,045"
                },
                {
                    "rawValue": 33.040816,
                    "value": "33.040816"
                },
                {
                    "rawValue": "–115.355395",
                    "value": "–115.355395"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Anchorage",
                    "value": "Anchorage"
                },
                {
                    "rawValue": "26,993",
                    "value": "26,993"
                },
                {
                    "rawValue": 61.177549,
                    "value": "61.177549"
                },
                {
                    "rawValue": "–149.274354",
                    "value": "–149.274354"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Weber",
                    "value": "Weber"
                },
                {
                    "rawValue": "26,931",
                    "value": "26,931"
                },
                {
                    "rawValue": 41.270355,
                    "value": "41.270355"
                },
                {
                    "rawValue": "–111.875879",
                    "value": "–111.875879"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Genesee",
                    "value": "Genesee"
                },
                {
                    "rawValue": "26,409",
                    "value": "26,409"
                },
                {
                    "rawValue": 43.021077000000005,
                    "value": "43.021077000000005"
                },
                {
                    "rawValue": "–83.706372",
                    "value": "–83.706372"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Weld",
                    "value": "Weld"
                },
                {
                    "rawValue": "26,191",
                    "value": "26,191"
                },
                {
                    "rawValue": 40.555794,
                    "value": "40.555794"
                },
                {
                    "rawValue": "–104.383649",
                    "value": "–104.383649"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hall",
                    "value": "Hall"
                },
                {
                    "rawValue": "25,997",
                    "value": "25,997"
                },
                {
                    "rawValue": 34.317588,
                    "value": "34.317588"
                },
                {
                    "rawValue": "–83.818497",
                    "value": "–83.818497"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Atlantic",
                    "value": "Atlantic"
                },
                {
                    "rawValue": "25,715",
                    "value": "25,715"
                },
                {
                    "rawValue": 39.469353999999996,
                    "value": "39.469353999999996"
                },
                {
                    "rawValue": "–74.633758",
                    "value": "–74.633758"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Elkhart",
                    "value": "Elkhart"
                },
                {
                    "rawValue": "25,706",
                    "value": "25,706"
                },
                {
                    "rawValue": 41.600693,
                    "value": "41.600693"
                },
                {
                    "rawValue": "–85.863986",
                    "value": "–85.863986"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Williamson",
                    "value": "Williamson"
                },
                {
                    "rawValue": "25,632",
                    "value": "25,632"
                },
                {
                    "rawValue": 35.894971999999996,
                    "value": "35.894971999999996"
                },
                {
                    "rawValue": "–86.896958",
                    "value": "–86.896958"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McLennan",
                    "value": "McLennan"
                },
                {
                    "rawValue": "25,455",
                    "value": "25,455"
                },
                {
                    "rawValue": 31.549493,
                    "value": "31.549493"
                },
                {
                    "rawValue": "–97.201472",
                    "value": "–97.201472"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Luzerne",
                    "value": "Luzerne"
                },
                {
                    "rawValue": "25,390",
                    "value": "25,390"
                },
                {
                    "rawValue": 41.172787,
                    "value": "41.172787"
                },
                {
                    "rawValue": "–75.976035",
                    "value": "–75.976035"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lake",
                    "value": "Lake"
                },
                {
                    "rawValue": "25,312",
                    "value": "25,312"
                },
                {
                    "rawValue": 28.764113000000002,
                    "value": "28.764113000000002"
                },
                {
                    "rawValue": "–81.712282",
                    "value": "–81.712282"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Canyon",
                    "value": "Canyon"
                },
                {
                    "rawValue": "24,965",
                    "value": "24,965"
                },
                {
                    "rawValue": 43.623051000000004,
                    "value": "43.623051000000004"
                },
                {
                    "rawValue": "–116.708527",
                    "value": "–116.708527"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Caddo",
                    "value": "Caddo"
                },
                {
                    "rawValue": "24,891",
                    "value": "24,891"
                },
                {
                    "rawValue": 32.577195,
                    "value": "32.577195"
                },
                {
                    "rawValue": "–93.882423",
                    "value": "–93.882423"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gloucester",
                    "value": "Gloucester"
                },
                {
                    "rawValue": "24,888",
                    "value": "24,888"
                },
                {
                    "rawValue": 39.721019,
                    "value": "39.721019"
                },
                {
                    "rawValue": "–75.143708",
                    "value": "–75.143708"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McHenry",
                    "value": "McHenry"
                },
                {
                    "rawValue": "24,763",
                    "value": "24,763"
                },
                {
                    "rawValue": 42.324298,
                    "value": "42.324298"
                },
                {
                    "rawValue": "–88.452245",
                    "value": "–88.452245"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cumberland",
                    "value": "Cumberland"
                },
                {
                    "rawValue": "24,693",
                    "value": "24,693"
                },
                {
                    "rawValue": 35.050191999999996,
                    "value": "35.050191999999996"
                },
                {
                    "rawValue": "–78.828719",
                    "value": "–78.828719"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Tammany",
                    "value": "St. Tammany"
                },
                {
                    "rawValue": "24,555",
                    "value": "24,555"
                },
                {
                    "rawValue": 30.410021999999998,
                    "value": "30.410021999999998"
                },
                {
                    "rawValue": "–89.951962",
                    "value": "–89.951962"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tuscaloosa",
                    "value": "Tuscaloosa"
                },
                {
                    "rawValue": "24,513",
                    "value": "24,513"
                },
                {
                    "rawValue": 33.290202,
                    "value": "33.290202"
                },
                {
                    "rawValue": "–87.522860",
                    "value": "–87.522860"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chesterfield",
                    "value": "Chesterfield"
                },
                {
                    "rawValue": "24,137",
                    "value": "24,137"
                },
                {
                    "rawValue": 37.378434000000006,
                    "value": "37.378434000000006"
                },
                {
                    "rawValue": "–77.585847",
                    "value": "–77.585847"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gaston",
                    "value": "Gaston"
                },
                {
                    "rawValue": "24,106",
                    "value": "24,106"
                },
                {
                    "rawValue": 35.293344,
                    "value": "35.293344"
                },
                {
                    "rawValue": "–81.177256",
                    "value": "–81.177256"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Somerset",
                    "value": "Somerset"
                },
                {
                    "rawValue": "23,905",
                    "value": "23,905"
                },
                {
                    "rawValue": 40.565521999999994,
                    "value": "40.565521999999994"
                },
                {
                    "rawValue": "–74.619930",
                    "value": "–74.619930"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clayton",
                    "value": "Clayton"
                },
                {
                    "rawValue": "23,851",
                    "value": "23,851"
                },
                {
                    "rawValue": 33.552242,
                    "value": "33.552242"
                },
                {
                    "rawValue": "–84.412977",
                    "value": "–84.412977"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Loudoun",
                    "value": "Loudoun"
                },
                {
                    "rawValue": "23,641",
                    "value": "23,641"
                },
                {
                    "rawValue": 39.08113,
                    "value": "39.08113"
                },
                {
                    "rawValue": "–77.638857",
                    "value": "–77.638857"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Doña Ana",
                    "value": "Doña Ana"
                },
                {
                    "rawValue": "23,362",
                    "value": "23,362"
                },
                {
                    "rawValue": 32.350912,
                    "value": "32.350912"
                },
                {
                    "rawValue": "–106.832182",
                    "value": "–106.832182"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dutchess",
                    "value": "Dutchess"
                },
                {
                    "rawValue": "23,288",
                    "value": "23,288"
                },
                {
                    "rawValue": 41.755009,
                    "value": "41.755009"
                },
                {
                    "rawValue": "–73.739951",
                    "value": "–73.739951"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Richmond",
                    "value": "Richmond"
                },
                {
                    "rawValue": "23,119",
                    "value": "23,119"
                },
                {
                    "rawValue": 33.361487,
                    "value": "33.361487"
                },
                {
                    "rawValue": "–82.074998",
                    "value": "–82.074998"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Racine",
                    "value": "Racine"
                },
                {
                    "rawValue": "23,094",
                    "value": "23,094"
                },
                {
                    "rawValue": 42.754075,
                    "value": "42.754075"
                },
                {
                    "rawValue": "–87.414676",
                    "value": "–87.414676"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sussex",
                    "value": "Sussex"
                },
                {
                    "rawValue": "22,993",
                    "value": "22,993"
                },
                {
                    "rawValue": 38.677510999999996,
                    "value": "38.677510999999996"
                },
                {
                    "rawValue": "–75.335495",
                    "value": "–75.335495"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "22,891",
                    "value": "22,891"
                },
                {
                    "rawValue": 32.203651,
                    "value": "32.203651"
                },
                {
                    "rawValue": "–86.203831",
                    "value": "–86.203831"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Lucie",
                    "value": "St. Lucie"
                },
                {
                    "rawValue": "22,811",
                    "value": "22,811"
                },
                {
                    "rawValue": 27.380775,
                    "value": "27.380775"
                },
                {
                    "rawValue": "–80.443364",
                    "value": "–80.443364"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Warren",
                    "value": "Warren"
                },
                {
                    "rawValue": "22,710",
                    "value": "22,710"
                },
                {
                    "rawValue": 39.425652,
                    "value": "39.425652"
                },
                {
                    "rawValue": "–84.169906",
                    "value": "–84.169906"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ottawa",
                    "value": "Ottawa"
                },
                {
                    "rawValue": "22,706",
                    "value": "22,706"
                },
                {
                    "rawValue": 42.942346,
                    "value": "42.942346"
                },
                {
                    "rawValue": "–86.655342",
                    "value": "–86.655342"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Alachua",
                    "value": "Alachua"
                },
                {
                    "rawValue": "22,697",
                    "value": "22,697"
                },
                {
                    "rawValue": 29.67574,
                    "value": "29.67574"
                },
                {
                    "rawValue": "–82.357221",
                    "value": "–82.357221"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Henry",
                    "value": "Henry"
                },
                {
                    "rawValue": "22,653",
                    "value": "22,653"
                },
                {
                    "rawValue": 33.452881,
                    "value": "33.452881"
                },
                {
                    "rawValue": "–84.154440",
                    "value": "–84.154440"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Douglas",
                    "value": "Douglas"
                },
                {
                    "rawValue": "22,636",
                    "value": "22,636"
                },
                {
                    "rawValue": 39.326435,
                    "value": "39.326435"
                },
                {
                    "rawValue": "–104.926199",
                    "value": "–104.926199"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Durham",
                    "value": "Durham"
                },
                {
                    "rawValue": "22,482",
                    "value": "22,482"
                },
                {
                    "rawValue": 36.036589,
                    "value": "36.036589"
                },
                {
                    "rawValue": "–78.877919",
                    "value": "–78.877919"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Honolulu",
                    "value": "Honolulu"
                },
                {
                    "rawValue": "22,430",
                    "value": "22,430"
                },
                {
                    "rawValue": 21.461364,
                    "value": "21.461364"
                },
                {
                    "rawValue": "–158.201976",
                    "value": "–158.201976"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shelby",
                    "value": "Shelby"
                },
                {
                    "rawValue": "22,377",
                    "value": "22,377"
                },
                {
                    "rawValue": 33.262937,
                    "value": "33.262937"
                },
                {
                    "rawValue": "–86.678104",
                    "value": "–86.678104"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lorain",
                    "value": "Lorain"
                },
                {
                    "rawValue": "22,358",
                    "value": "22,358"
                },
                {
                    "rawValue": 41.438805,
                    "value": "41.438805"
                },
                {
                    "rawValue": "–82.179722",
                    "value": "–82.179722"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "22,353",
                    "value": "22,353"
                },
                {
                    "rawValue": 45.037929,
                    "value": "45.037929"
                },
                {
                    "rawValue": "–92.890117",
                    "value": "–92.890117"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kings",
                    "value": "Kings"
                },
                {
                    "rawValue": "22,250",
                    "value": "22,250"
                },
                {
                    "rawValue": 36.072478000000004,
                    "value": "36.072478000000004"
                },
                {
                    "rawValue": "–119.815530",
                    "value": "–119.815530"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Outagamie",
                    "value": "Outagamie"
                },
                {
                    "rawValue": "21,905",
                    "value": "21,905"
                },
                {
                    "rawValue": 44.418226000000004,
                    "value": "44.418226000000004"
                },
                {
                    "rawValue": "–88.464988",
                    "value": "–88.464988"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Henrico",
                    "value": "Henrico"
                },
                {
                    "rawValue": "21,884",
                    "value": "21,884"
                },
                {
                    "rawValue": 37.437521000000004,
                    "value": "37.437521000000004"
                },
                {
                    "rawValue": "–77.300333",
                    "value": "–77.300333"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "21,841",
                    "value": "21,841"
                },
                {
                    "rawValue": 38.257414000000004,
                    "value": "38.257414000000004"
                },
                {
                    "rawValue": "–90.543138",
                    "value": "–90.543138"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lafayette",
                    "value": "Lafayette"
                },
                {
                    "rawValue": "21,805",
                    "value": "21,805"
                },
                {
                    "rawValue": 30.206507000000002,
                    "value": "30.206507000000002"
                },
                {
                    "rawValue": "–92.064170",
                    "value": "–92.064170"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Louis city",
                    "value": "St. Louis city"
                },
                {
                    "rawValue": "21,787",
                    "value": "21,787"
                },
                {
                    "rawValue": 38.635699,
                    "value": "38.635699"
                },
                {
                    "rawValue": "–90.244582",
                    "value": "–90.244582"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Brazos",
                    "value": "Brazos"
                },
                {
                    "rawValue": "21,699",
                    "value": "21,699"
                },
                {
                    "rawValue": 30.656725,
                    "value": "30.656725"
                },
                {
                    "rawValue": "–96.302389",
                    "value": "–96.302389"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sumner",
                    "value": "Sumner"
                },
                {
                    "rawValue": "21,668",
                    "value": "21,668"
                },
                {
                    "rawValue": 36.470015000000004,
                    "value": "36.470015000000004"
                },
                {
                    "rawValue": "–86.458517",
                    "value": "–86.458517"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cass",
                    "value": "Cass"
                },
                {
                    "rawValue": "21,583",
                    "value": "21,583"
                },
                {
                    "rawValue": 46.927003000000006,
                    "value": "46.927003000000006"
                },
                {
                    "rawValue": "–97.252375",
                    "value": "–97.252375"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "21,546",
                    "value": "21,546"
                },
                {
                    "rawValue": 45.553542,
                    "value": "45.553542"
                },
                {
                    "rawValue": "–123.097615",
                    "value": "–123.097615"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mohave",
                    "value": "Mohave"
                },
                {
                    "rawValue": "21,484",
                    "value": "21,484"
                },
                {
                    "rawValue": 35.717705,
                    "value": "35.717705"
                },
                {
                    "rawValue": "–113.749689",
                    "value": "–113.749689"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ellis",
                    "value": "Ellis"
                },
                {
                    "rawValue": "21,437",
                    "value": "21,437"
                },
                {
                    "rawValue": 32.347279,
                    "value": "32.347279"
                },
                {
                    "rawValue": "–96.798336",
                    "value": "–96.798336"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chatham",
                    "value": "Chatham"
                },
                {
                    "rawValue": "21,406",
                    "value": "21,406"
                },
                {
                    "rawValue": 31.974756,
                    "value": "31.974756"
                },
                {
                    "rawValue": "–81.091768",
                    "value": "–81.091768"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Albany",
                    "value": "Albany"
                },
                {
                    "rawValue": "21,403",
                    "value": "21,403"
                },
                {
                    "rawValue": 42.588271,
                    "value": "42.588271"
                },
                {
                    "rawValue": "–73.974014",
                    "value": "–73.974014"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Vanderburgh",
                    "value": "Vanderburgh"
                },
                {
                    "rawValue": "21,394",
                    "value": "21,394"
                },
                {
                    "rawValue": 38.020070000000004,
                    "value": "38.020070000000004"
                },
                {
                    "rawValue": "–87.586166",
                    "value": "–87.586166"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Union",
                    "value": "Union"
                },
                {
                    "rawValue": "21,188",
                    "value": "21,188"
                },
                {
                    "rawValue": 34.991501,
                    "value": "34.991501"
                },
                {
                    "rawValue": "–80.530131",
                    "value": "–80.530131"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dauphin",
                    "value": "Dauphin"
                },
                {
                    "rawValue": "21,128",
                    "value": "21,128"
                },
                {
                    "rawValue": 40.412565,
                    "value": "40.412565"
                },
                {
                    "rawValue": "–76.792634",
                    "value": "–76.792634"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bell",
                    "value": "Bell"
                },
                {
                    "rawValue": "20,920",
                    "value": "20,920"
                },
                {
                    "rawValue": 31.042109999999997,
                    "value": "31.042109999999997"
                },
                {
                    "rawValue": "–97.481921",
                    "value": "–97.481921"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Anderson",
                    "value": "Anderson"
                },
                {
                    "rawValue": "20,876",
                    "value": "20,876"
                },
                {
                    "rawValue": 34.519549,
                    "value": "34.519549"
                },
                {
                    "rawValue": "–82.638086",
                    "value": "–82.638086"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Larimer",
                    "value": "Larimer"
                },
                {
                    "rawValue": "20,750",
                    "value": "20,750"
                },
                {
                    "rawValue": 40.663090999999994,
                    "value": "40.663090999999994"
                },
                {
                    "rawValue": "–105.482131",
                    "value": "–105.482131"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Forsyth",
                    "value": "Forsyth"
                },
                {
                    "rawValue": "20,597",
                    "value": "20,597"
                },
                {
                    "rawValue": 34.225143,
                    "value": "34.225143"
                },
                {
                    "rawValue": "–84.127336",
                    "value": "–84.127336"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Johns",
                    "value": "St. Johns"
                },
                {
                    "rawValue": "20,413",
                    "value": "20,413"
                },
                {
                    "rawValue": 29.890593,
                    "value": "29.890593"
                },
                {
                    "rawValue": "–81.383914",
                    "value": "–81.383914"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "20,368",
                    "value": "20,368"
                },
                {
                    "rawValue": 37.262531,
                    "value": "37.262531"
                },
                {
                    "rawValue": "–113.487800",
                    "value": "–113.487800"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tippecanoe",
                    "value": "Tippecanoe"
                },
                {
                    "rawValue": "20,330",
                    "value": "20,330"
                },
                {
                    "rawValue": 40.38926,
                    "value": "40.38926"
                },
                {
                    "rawValue": "–86.893943",
                    "value": "–86.893943"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sarpy",
                    "value": "Sarpy"
                },
                {
                    "rawValue": "20,249",
                    "value": "20,249"
                },
                {
                    "rawValue": 41.115064000000004,
                    "value": "41.115064000000004"
                },
                {
                    "rawValue": "–96.109125",
                    "value": "–96.109125"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Placer",
                    "value": "Placer"
                },
                {
                    "rawValue": "20,204",
                    "value": "20,204"
                },
                {
                    "rawValue": 39.062032,
                    "value": "39.062032"
                },
                {
                    "rawValue": "–120.722718",
                    "value": "–120.722718"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Calcasieu",
                    "value": "Calcasieu"
                },
                {
                    "rawValue": "20,126",
                    "value": "20,126"
                },
                {
                    "rawValue": 30.229559000000002,
                    "value": "30.229559000000002"
                },
                {
                    "rawValue": "–93.358015",
                    "value": "–93.358015"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oneida",
                    "value": "Oneida"
                },
                {
                    "rawValue": "20,031",
                    "value": "20,031"
                },
                {
                    "rawValue": 43.242727,
                    "value": "43.242727"
                },
                {
                    "rawValue": "–75.434282",
                    "value": "–75.434282"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Baldwin",
                    "value": "Baldwin"
                },
                {
                    "rawValue": "20,012",
                    "value": "20,012"
                },
                {
                    "rawValue": 30.659218,
                    "value": "30.659218"
                },
                {
                    "rawValue": "–87.746067",
                    "value": "–87.746067"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Luis Obispo",
                    "value": "San Luis Obispo"
                },
                {
                    "rawValue": "19,966",
                    "value": "19,966"
                },
                {
                    "rawValue": 35.385227,
                    "value": "35.385227"
                },
                {
                    "rawValue": "–120.447540",
                    "value": "–120.447540"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Winnebago",
                    "value": "Winnebago"
                },
                {
                    "rawValue": "19,951",
                    "value": "19,951"
                },
                {
                    "rawValue": 44.085707,
                    "value": "44.085707"
                },
                {
                    "rawValue": "–88.668149",
                    "value": "–88.668149"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "DeSoto",
                    "value": "DeSoto"
                },
                {
                    "rawValue": "19,868",
                    "value": "19,868"
                },
                {
                    "rawValue": 34.874266,
                    "value": "34.874266"
                },
                {
                    "rawValue": "–89.993240",
                    "value": "–89.993240"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washtenaw",
                    "value": "Washtenaw"
                },
                {
                    "rawValue": "19,728",
                    "value": "19,728"
                },
                {
                    "rawValue": 42.252327,
                    "value": "42.252327"
                },
                {
                    "rawValue": "–83.844634",
                    "value": "–83.844634"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mahoning",
                    "value": "Mahoning"
                },
                {
                    "rawValue": "19,652",
                    "value": "19,652"
                },
                {
                    "rawValue": 41.01088,
                    "value": "41.01088"
                },
                {
                    "rawValue": "–80.770396",
                    "value": "–80.770396"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "New London",
                    "value": "New London"
                },
                {
                    "rawValue": "19,624",
                    "value": "19,624"
                },
                {
                    "rawValue": 41.478629999999995,
                    "value": "41.478629999999995"
                },
                {
                    "rawValue": "–72.103452",
                    "value": "–72.103452"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Linn",
                    "value": "Linn"
                },
                {
                    "rawValue": "19,558",
                    "value": "19,558"
                },
                {
                    "rawValue": 42.077951,
                    "value": "42.077951"
                },
                {
                    "rawValue": "–91.597674",
                    "value": "–91.597674"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Boulder",
                    "value": "Boulder"
                },
                {
                    "rawValue": "19,395",
                    "value": "19,395"
                },
                {
                    "rawValue": 40.094826,
                    "value": "40.094826"
                },
                {
                    "rawValue": "–105.398382",
                    "value": "–105.398382"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wyandotte",
                    "value": "Wyandotte"
                },
                {
                    "rawValue": "19,375",
                    "value": "19,375"
                },
                {
                    "rawValue": 39.115384000000006,
                    "value": "39.115384000000006"
                },
                {
                    "rawValue": "–94.763087",
                    "value": "–94.763087"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Okaloosa",
                    "value": "Okaloosa"
                },
                {
                    "rawValue": "19,340",
                    "value": "19,340"
                },
                {
                    "rawValue": 30.665858,
                    "value": "30.665858"
                },
                {
                    "rawValue": "–86.594194",
                    "value": "–86.594194"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clark",
                    "value": "Clark"
                },
                {
                    "rawValue": "19,285",
                    "value": "19,285"
                },
                {
                    "rawValue": 45.771674,
                    "value": "45.771674"
                },
                {
                    "rawValue": "–122.485903",
                    "value": "–122.485903"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bay",
                    "value": "Bay"
                },
                {
                    "rawValue": "19,089",
                    "value": "19,089"
                },
                {
                    "rawValue": 30.237563,
                    "value": "30.237563"
                },
                {
                    "rawValue": "–85.631348",
                    "value": "–85.631348"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Smith",
                    "value": "Smith"
                },
                {
                    "rawValue": "19,029",
                    "value": "19,029"
                },
                {
                    "rawValue": 32.377093,
                    "value": "32.377093"
                },
                {
                    "rawValue": "–95.269630",
                    "value": "–95.269630"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hinds",
                    "value": "Hinds"
                },
                {
                    "rawValue": "19,021",
                    "value": "19,021"
                },
                {
                    "rawValue": 32.267924,
                    "value": "32.267924"
                },
                {
                    "rawValue": "–90.465900",
                    "value": "–90.465900"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rockingham",
                    "value": "Rockingham"
                },
                {
                    "rawValue": "19,003",
                    "value": "19,003"
                },
                {
                    "rawValue": 42.98936,
                    "value": "42.98936"
                },
                {
                    "rawValue": "–71.099437",
                    "value": "–71.099437"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stearns",
                    "value": "Stearns"
                },
                {
                    "rawValue": "18,930",
                    "value": "18,930"
                },
                {
                    "rawValue": 45.555234999999996,
                    "value": "45.555234999999996"
                },
                {
                    "rawValue": "–94.610482",
                    "value": "–94.610482"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cabarrus",
                    "value": "Cabarrus"
                },
                {
                    "rawValue": "18,857",
                    "value": "18,857"
                },
                {
                    "rawValue": 35.387845,
                    "value": "35.387845"
                },
                {
                    "rawValue": "–80.552868",
                    "value": "–80.552868"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Johnson",
                    "value": "Johnson"
                },
                {
                    "rawValue": "18,841",
                    "value": "18,841"
                },
                {
                    "rawValue": 32.379511,
                    "value": "32.379511"
                },
                {
                    "rawValue": "–97.364823",
                    "value": "–97.364823"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marion",
                    "value": "Marion"
                },
                {
                    "rawValue": "18,753",
                    "value": "18,753"
                },
                {
                    "rawValue": 44.900898,
                    "value": "44.900898"
                },
                {
                    "rawValue": "–122.576260",
                    "value": "–122.576260"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lake",
                    "value": "Lake"
                },
                {
                    "rawValue": "18,673",
                    "value": "18,673"
                },
                {
                    "rawValue": 41.924116,
                    "value": "41.924116"
                },
                {
                    "rawValue": "–81.392643",
                    "value": "–81.392643"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chesapeake city",
                    "value": "Chesapeake city"
                },
                {
                    "rawValue": "18,625",
                    "value": "18,625"
                },
                {
                    "rawValue": 36.679376,
                    "value": "36.679376"
                },
                {
                    "rawValue": "–76.301788",
                    "value": "–76.301788"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clermont",
                    "value": "Clermont"
                },
                {
                    "rawValue": "18,615",
                    "value": "18,615"
                },
                {
                    "rawValue": 39.052084,
                    "value": "39.052084"
                },
                {
                    "rawValue": "–84.149614",
                    "value": "–84.149614"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "18,482",
                    "value": "18,482"
                },
                {
                    "rawValue": 29.854,
                    "value": "29.854"
                },
                {
                    "rawValue": "–94.149331",
                    "value": "–94.149331"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Champaign",
                    "value": "Champaign"
                },
                {
                    "rawValue": "18,473",
                    "value": "18,473"
                },
                {
                    "rawValue": 40.13915,
                    "value": "40.13915"
                },
                {
                    "rawValue": "–88.197201",
                    "value": "–88.197201"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hays",
                    "value": "Hays"
                },
                {
                    "rawValue": "18,452",
                    "value": "18,452"
                },
                {
                    "rawValue": 30.061225,
                    "value": "30.061225"
                },
                {
                    "rawValue": "–98.029267",
                    "value": "–98.029267"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Johnston",
                    "value": "Johnston"
                },
                {
                    "rawValue": "18,414",
                    "value": "18,414"
                },
                {
                    "rawValue": 35.513405,
                    "value": "35.513405"
                },
                {
                    "rawValue": "–78.367267",
                    "value": "–78.367267"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Juan",
                    "value": "San Juan"
                },
                {
                    "rawValue": "18,125",
                    "value": "18,125"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Yavapai",
                    "value": "Yavapai"
                },
                {
                    "rawValue": "18,046",
                    "value": "18,046"
                },
                {
                    "rawValue": 34.630044,
                    "value": "34.630044"
                },
                {
                    "rawValue": "–112.573745",
                    "value": "–112.573745"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Erie",
                    "value": "Erie"
                },
                {
                    "rawValue": "17,875",
                    "value": "17,875"
                },
                {
                    "rawValue": 42.117952,
                    "value": "42.117952"
                },
                {
                    "rawValue": "–80.096386",
                    "value": "–80.096386"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pitt",
                    "value": "Pitt"
                },
                {
                    "rawValue": "17,767",
                    "value": "17,767"
                },
                {
                    "rawValue": 35.591065,
                    "value": "35.591065"
                },
                {
                    "rawValue": "–77.372404",
                    "value": "–77.372404"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ouachita",
                    "value": "Ouachita"
                },
                {
                    "rawValue": "17,749",
                    "value": "17,749"
                },
                {
                    "rawValue": 32.477495000000005,
                    "value": "32.477495000000005"
                },
                {
                    "rawValue": "–92.154798",
                    "value": "–92.154798"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Catawba",
                    "value": "Catawba"
                },
                {
                    "rawValue": "17,699",
                    "value": "17,699"
                },
                {
                    "rawValue": 35.663182,
                    "value": "35.663182"
                },
                {
                    "rawValue": "–81.214151",
                    "value": "–81.214151"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Boone",
                    "value": "Boone"
                },
                {
                    "rawValue": "17,616",
                    "value": "17,616"
                },
                {
                    "rawValue": 38.989657,
                    "value": "38.989657"
                },
                {
                    "rawValue": "–92.310779",
                    "value": "–92.310779"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "17,611",
                    "value": "17,611"
                },
                {
                    "rawValue": 36.500353999999994,
                    "value": "36.500353999999994"
                },
                {
                    "rawValue": "–87.380887",
                    "value": "–87.380887"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Santa Rosa",
                    "value": "Santa Rosa"
                },
                {
                    "rawValue": "17,374",
                    "value": "17,374"
                },
                {
                    "rawValue": 30.703633,
                    "value": "30.703633"
                },
                {
                    "rawValue": "–87.014255",
                    "value": "–87.014255"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Frederick",
                    "value": "Frederick"
                },
                {
                    "rawValue": "17,291",
                    "value": "17,291"
                },
                {
                    "rawValue": 39.470427,
                    "value": "39.470427"
                },
                {
                    "rawValue": "–77.397627",
                    "value": "–77.397627"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Scott",
                    "value": "Scott"
                },
                {
                    "rawValue": "17,270",
                    "value": "17,270"
                },
                {
                    "rawValue": 41.641678999999996,
                    "value": "41.641678999999996"
                },
                {
                    "rawValue": "–90.622290",
                    "value": "–90.622290"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Peoria",
                    "value": "Peoria"
                },
                {
                    "rawValue": "17,208",
                    "value": "17,208"
                },
                {
                    "rawValue": 40.785999,
                    "value": "40.785999"
                },
                {
                    "rawValue": "–89.767358",
                    "value": "–89.767358"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kenosha",
                    "value": "Kenosha"
                },
                {
                    "rawValue": "17,143",
                    "value": "17,143"
                },
                {
                    "rawValue": 42.579703,
                    "value": "42.579703"
                },
                {
                    "rawValue": "–87.424898",
                    "value": "–87.424898"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Potter",
                    "value": "Potter"
                },
                {
                    "rawValue": "17,007",
                    "value": "17,007"
                },
                {
                    "rawValue": 35.398675,
                    "value": "35.398675"
                },
                {
                    "rawValue": "–101.893804",
                    "value": "–101.893804"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harrison",
                    "value": "Harrison"
                },
                {
                    "rawValue": "16,962",
                    "value": "16,962"
                },
                {
                    "rawValue": 30.416535999999997,
                    "value": "30.416535999999997"
                },
                {
                    "rawValue": "–89.083376",
                    "value": "–89.083376"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cumberland",
                    "value": "Cumberland"
                },
                {
                    "rawValue": "16,932",
                    "value": "16,932"
                },
                {
                    "rawValue": 40.164782,
                    "value": "40.164782"
                },
                {
                    "rawValue": "–77.263440",
                    "value": "–77.263440"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clay",
                    "value": "Clay"
                },
                {
                    "rawValue": "16,929",
                    "value": "16,929"
                },
                {
                    "rawValue": 29.987115999999997,
                    "value": "29.987115999999997"
                },
                {
                    "rawValue": "–81.858147",
                    "value": "–81.858147"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ingham",
                    "value": "Ingham"
                },
                {
                    "rawValue": "16,899",
                    "value": "16,899"
                },
                {
                    "rawValue": 42.603534,
                    "value": "42.603534"
                },
                {
                    "rawValue": "–84.373811",
                    "value": "–84.373811"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kootenai",
                    "value": "Kootenai"
                },
                {
                    "rawValue": "16,885",
                    "value": "16,885"
                },
                {
                    "rawValue": 47.677113,
                    "value": "47.677113"
                },
                {
                    "rawValue": "–116.694918",
                    "value": "–116.694918"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Florence",
                    "value": "Florence"
                },
                {
                    "rawValue": "16,838",
                    "value": "16,838"
                },
                {
                    "rawValue": 34.028535,
                    "value": "34.028535"
                },
                {
                    "rawValue": "–79.710233",
                    "value": "–79.710233"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pickens",
                    "value": "Pickens"
                },
                {
                    "rawValue": "16,800",
                    "value": "16,800"
                },
                {
                    "rawValue": 34.887361999999996,
                    "value": "34.887361999999996"
                },
                {
                    "rawValue": "–82.725368",
                    "value": "–82.725368"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coconino",
                    "value": "Coconino"
                },
                {
                    "rawValue": "16,795",
                    "value": "16,795"
                },
                {
                    "rawValue": 35.829692,
                    "value": "35.829692"
                },
                {
                    "rawValue": "–111.773728",
                    "value": "–111.773728"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wilson",
                    "value": "Wilson"
                },
                {
                    "rawValue": "16,786",
                    "value": "16,786"
                },
                {
                    "rawValue": 36.148476,
                    "value": "36.148476"
                },
                {
                    "rawValue": "–86.290210",
                    "value": "–86.290210"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Iredell",
                    "value": "Iredell"
                },
                {
                    "rawValue": "16,746",
                    "value": "16,746"
                },
                {
                    "rawValue": 35.806356,
                    "value": "35.806356"
                },
                {
                    "rawValue": "–80.874545",
                    "value": "–80.874545"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Delaware",
                    "value": "Delaware"
                },
                {
                    "rawValue": "16,712",
                    "value": "16,712"
                },
                {
                    "rawValue": 40.278940999999996,
                    "value": "40.278940999999996"
                },
                {
                    "rawValue": "–83.007462",
                    "value": "–83.007462"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Midland",
                    "value": "Midland"
                },
                {
                    "rawValue": "16,699",
                    "value": "16,699"
                },
                {
                    "rawValue": 31.870896000000002,
                    "value": "31.870896000000002"
                },
                {
                    "rawValue": "–102.024326",
                    "value": "–102.024326"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Johnson",
                    "value": "Johnson"
                },
                {
                    "rawValue": "16,604",
                    "value": "16,604"
                },
                {
                    "rawValue": 39.495986,
                    "value": "39.495986"
                },
                {
                    "rawValue": "–86.094600",
                    "value": "–86.094600"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "New Hanover",
                    "value": "New Hanover"
                },
                {
                    "rawValue": "16,600",
                    "value": "16,600"
                },
                {
                    "rawValue": 34.177465999999995,
                    "value": "34.177465999999995"
                },
                {
                    "rawValue": "–77.871378",
                    "value": "–77.871378"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shawnee",
                    "value": "Shawnee"
                },
                {
                    "rawValue": "16,544",
                    "value": "16,544"
                },
                {
                    "rawValue": 39.041805,
                    "value": "39.041805"
                },
                {
                    "rawValue": "–95.755664",
                    "value": "–95.755664"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tom Green",
                    "value": "Tom Green"
                },
                {
                    "rawValue": "16,444",
                    "value": "16,444"
                },
                {
                    "rawValue": 31.401583000000002,
                    "value": "31.401583000000002"
                },
                {
                    "rawValue": "–100.461355",
                    "value": "–100.461355"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ector",
                    "value": "Ector"
                },
                {
                    "rawValue": "16,424",
                    "value": "16,424"
                },
                {
                    "rawValue": 31.865301000000002,
                    "value": "31.865301000000002"
                },
                {
                    "rawValue": "–102.542507",
                    "value": "–102.542507"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Yellowstone",
                    "value": "Yellowstone"
                },
                {
                    "rawValue": "16,365",
                    "value": "16,365"
                },
                {
                    "rawValue": 45.936987,
                    "value": "45.936987"
                },
                {
                    "rawValue": "–108.276656",
                    "value": "–108.276656"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sangamon",
                    "value": "Sangamon"
                },
                {
                    "rawValue": "16,328",
                    "value": "16,328"
                },
                {
                    "rawValue": 39.756378000000005,
                    "value": "39.756378000000005"
                },
                {
                    "rawValue": "–89.662311",
                    "value": "–89.662311"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Randall",
                    "value": "Randall"
                },
                {
                    "rawValue": "16,305",
                    "value": "16,305"
                },
                {
                    "rawValue": 34.962528999999996,
                    "value": "34.962528999999996"
                },
                {
                    "rawValue": "–101.895547",
                    "value": "–101.895547"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Howard",
                    "value": "Howard"
                },
                {
                    "rawValue": "16,289",
                    "value": "16,289"
                },
                {
                    "rawValue": 39.252264000000004,
                    "value": "39.252264000000004"
                },
                {
                    "rawValue": "–76.924406",
                    "value": "–76.924406"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Saginaw",
                    "value": "Saginaw"
                },
                {
                    "rawValue": "16,276",
                    "value": "16,276"
                },
                {
                    "rawValue": 43.328267,
                    "value": "43.328267"
                },
                {
                    "rawValue": "–84.055410",
                    "value": "–84.055410"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Porter",
                    "value": "Porter"
                },
                {
                    "rawValue": "16,157",
                    "value": "16,157"
                },
                {
                    "rawValue": 41.509921999999996,
                    "value": "41.509921999999996"
                },
                {
                    "rawValue": "–87.071308",
                    "value": "–87.071308"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Canadian",
                    "value": "Canadian"
                },
                {
                    "rawValue": "16,157",
                    "value": "16,157"
                },
                {
                    "rawValue": 35.543416,
                    "value": "35.543416"
                },
                {
                    "rawValue": "–97.979836",
                    "value": "–97.979836"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Aiken",
                    "value": "Aiken"
                },
                {
                    "rawValue": "16,107",
                    "value": "16,107"
                },
                {
                    "rawValue": 33.549316999999995,
                    "value": "33.549316999999995"
                },
                {
                    "rawValue": "–81.633870",
                    "value": "–81.633870"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Whitfield",
                    "value": "Whitfield"
                },
                {
                    "rawValue": "16,093",
                    "value": "16,093"
                },
                {
                    "rawValue": 34.801726,
                    "value": "34.801726"
                },
                {
                    "rawValue": "–84.968541",
                    "value": "–84.968541"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hendricks",
                    "value": "Hendricks"
                },
                {
                    "rawValue": "16,053",
                    "value": "16,053"
                },
                {
                    "rawValue": 39.768749,
                    "value": "39.768749"
                },
                {
                    "rawValue": "–86.510287",
                    "value": "–86.510287"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rock",
                    "value": "Rock"
                },
                {
                    "rawValue": "16,053",
                    "value": "16,053"
                },
                {
                    "rawValue": 42.669931,
                    "value": "42.669931"
                },
                {
                    "rawValue": "–89.075119",
                    "value": "–89.075119"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Alamance",
                    "value": "Alamance"
                },
                {
                    "rawValue": "16,040",
                    "value": "16,040"
                },
                {
                    "rawValue": 36.041973999999996,
                    "value": "36.041973999999996"
                },
                {
                    "rawValue": "–79.399935",
                    "value": "–79.399935"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Columbia",
                    "value": "Columbia"
                },
                {
                    "rawValue": "15,945",
                    "value": "15,945"
                },
                {
                    "rawValue": 33.550556,
                    "value": "33.550556"
                },
                {
                    "rawValue": "–82.251342",
                    "value": "–82.251342"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Buncombe",
                    "value": "Buncombe"
                },
                {
                    "rawValue": "15,857",
                    "value": "15,857"
                },
                {
                    "rawValue": 35.609371,
                    "value": "35.609371"
                },
                {
                    "rawValue": "–82.530426",
                    "value": "–82.530426"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kent",
                    "value": "Kent"
                },
                {
                    "rawValue": "15,760",
                    "value": "15,760"
                },
                {
                    "rawValue": 41.67775,
                    "value": "41.67775"
                },
                {
                    "rawValue": "–71.576314",
                    "value": "–71.576314"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Beaufort",
                    "value": "Beaufort"
                },
                {
                    "rawValue": "15,758",
                    "value": "15,758"
                },
                {
                    "rawValue": 32.358146999999995,
                    "value": "32.358146999999995"
                },
                {
                    "rawValue": "–80.689320",
                    "value": "–80.689320"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kenton",
                    "value": "Kenton"
                },
                {
                    "rawValue": "15,724",
                    "value": "15,724"
                },
                {
                    "rawValue": 38.930477,
                    "value": "38.930477"
                },
                {
                    "rawValue": "–84.533492",
                    "value": "–84.533492"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Navajo",
                    "value": "Navajo"
                },
                {
                    "rawValue": "15,702",
                    "value": "15,702"
                },
                {
                    "rawValue": 35.390934,
                    "value": "35.390934"
                },
                {
                    "rawValue": "–110.320908",
                    "value": "–110.320908"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madera",
                    "value": "Madera"
                },
                {
                    "rawValue": "15,701",
                    "value": "15,701"
                },
                {
                    "rawValue": 37.210039,
                    "value": "37.210039"
                },
                {
                    "rawValue": "–119.749852",
                    "value": "–119.749852"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "15,674",
                    "value": "15,674"
                },
                {
                    "rawValue": 43.391156,
                    "value": "43.391156"
                },
                {
                    "rawValue": "–88.232917",
                    "value": "–88.232917"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Niagara",
                    "value": "Niagara"
                },
                {
                    "rawValue": "15,637",
                    "value": "15,637"
                },
                {
                    "rawValue": 43.456731,
                    "value": "43.456731"
                },
                {
                    "rawValue": "–78.792143",
                    "value": "–78.792143"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Broome",
                    "value": "Broome"
                },
                {
                    "rawValue": "15,620",
                    "value": "15,620"
                },
                {
                    "rawValue": 42.161977,
                    "value": "42.161977"
                },
                {
                    "rawValue": "–75.830291",
                    "value": "–75.830291"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dorchester",
                    "value": "Dorchester"
                },
                {
                    "rawValue": "15,556",
                    "value": "15,556"
                },
                {
                    "rawValue": 33.082186,
                    "value": "33.082186"
                },
                {
                    "rawValue": "–80.404697",
                    "value": "–80.404697"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kalamazoo",
                    "value": "Kalamazoo"
                },
                {
                    "rawValue": "15,498",
                    "value": "15,498"
                },
                {
                    "rawValue": 42.246266,
                    "value": "42.246266"
                },
                {
                    "rawValue": "–85.532854",
                    "value": "–85.532854"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Robeson",
                    "value": "Robeson"
                },
                {
                    "rawValue": "15,387",
                    "value": "15,387"
                },
                {
                    "rawValue": 34.63921,
                    "value": "34.63921"
                },
                {
                    "rawValue": "–79.100881",
                    "value": "–79.100881"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Taylor",
                    "value": "Taylor"
                },
                {
                    "rawValue": "15,364",
                    "value": "15,364"
                },
                {
                    "rawValue": 32.295684,
                    "value": "32.295684"
                },
                {
                    "rawValue": "–99.893220",
                    "value": "–99.893220"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Berkeley",
                    "value": "Berkeley"
                },
                {
                    "rawValue": "15,342",
                    "value": "15,342"
                },
                {
                    "rawValue": 33.2077,
                    "value": "33.2077"
                },
                {
                    "rawValue": "–79.953655",
                    "value": "–79.953655"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pueblo",
                    "value": "Pueblo"
                },
                {
                    "rawValue": "15,266",
                    "value": "15,266"
                },
                {
                    "rawValue": 38.170658,
                    "value": "38.170658"
                },
                {
                    "rawValue": "–104.489893",
                    "value": "–104.489893"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Norfolk city",
                    "value": "Norfolk city"
                },
                {
                    "rawValue": "15,250",
                    "value": "15,250"
                },
                {
                    "rawValue": 36.923015,
                    "value": "36.923015"
                },
                {
                    "rawValue": "–76.244641",
                    "value": "–76.244641"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Benton",
                    "value": "Benton"
                },
                {
                    "rawValue": "15,248",
                    "value": "15,248"
                },
                {
                    "rawValue": 46.228072,
                    "value": "46.228072"
                },
                {
                    "rawValue": "–119.516864",
                    "value": "–119.516864"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Licking",
                    "value": "Licking"
                },
                {
                    "rawValue": "15,176",
                    "value": "15,176"
                },
                {
                    "rawValue": 40.093609,
                    "value": "40.093609"
                },
                {
                    "rawValue": "–82.481251",
                    "value": "–82.481251"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bibb",
                    "value": "Bibb"
                },
                {
                    "rawValue": "15,161",
                    "value": "15,161"
                },
                {
                    "rawValue": 32.808844,
                    "value": "32.808844"
                },
                {
                    "rawValue": "–83.694193",
                    "value": "–83.694193"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marathon",
                    "value": "Marathon"
                },
                {
                    "rawValue": "15,140",
                    "value": "15,140"
                },
                {
                    "rawValue": 44.898036,
                    "value": "44.898036"
                },
                {
                    "rawValue": "–89.757823",
                    "value": "–89.757823"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rowan",
                    "value": "Rowan"
                },
                {
                    "rawValue": "15,132",
                    "value": "15,132"
                },
                {
                    "rawValue": 35.639218,
                    "value": "35.639218"
                },
                {
                    "rawValue": "–80.525344",
                    "value": "–80.525344"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Paulding",
                    "value": "Paulding"
                },
                {
                    "rawValue": "15,123",
                    "value": "15,123"
                },
                {
                    "rawValue": 33.920903,
                    "value": "33.920903"
                },
                {
                    "rawValue": "–84.866979",
                    "value": "–84.866979"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kaufman",
                    "value": "Kaufman"
                },
                {
                    "rawValue": "15,112",
                    "value": "15,112"
                },
                {
                    "rawValue": 32.598944,
                    "value": "32.598944"
                },
                {
                    "rawValue": "–96.288378",
                    "value": "–96.288378"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Richmond city",
                    "value": "Richmond city"
                },
                {
                    "rawValue": "15,110",
                    "value": "15,110"
                },
                {
                    "rawValue": 37.531399,
                    "value": "37.531399"
                },
                {
                    "rawValue": "–77.476009",
                    "value": "–77.476009"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lee",
                    "value": "Lee"
                },
                {
                    "rawValue": "15,108",
                    "value": "15,108"
                },
                {
                    "rawValue": 32.604064,
                    "value": "32.604064"
                },
                {
                    "rawValue": "–85.353048",
                    "value": "–85.353048"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cache",
                    "value": "Cache"
                },
                {
                    "rawValue": "15,063",
                    "value": "15,063"
                },
                {
                    "rawValue": 41.734225,
                    "value": "41.734225"
                },
                {
                    "rawValue": "–111.744581",
                    "value": "–111.744581"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Louis",
                    "value": "St. Louis"
                },
                {
                    "rawValue": "15,059",
                    "value": "15,059"
                },
                {
                    "rawValue": 47.583852,
                    "value": "47.583852"
                },
                {
                    "rawValue": "–92.463645",
                    "value": "–92.463645"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Black Hawk",
                    "value": "Black Hawk"
                },
                {
                    "rawValue": "15,028",
                    "value": "15,028"
                },
                {
                    "rawValue": 42.472888,
                    "value": "42.472888"
                },
                {
                    "rawValue": "–92.306059",
                    "value": "–92.306059"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Parker",
                    "value": "Parker"
                },
                {
                    "rawValue": "15,022",
                    "value": "15,022"
                },
                {
                    "rawValue": 32.777096,
                    "value": "32.777096"
                },
                {
                    "rawValue": "–97.805905",
                    "value": "–97.805905"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Santa Cruz",
                    "value": "Santa Cruz"
                },
                {
                    "rawValue": "14,937",
                    "value": "14,937"
                },
                {
                    "rawValue": 37.012488,
                    "value": "37.012488"
                },
                {
                    "rawValue": "–122.007205",
                    "value": "–122.007205"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Onslow",
                    "value": "Onslow"
                },
                {
                    "rawValue": "14,912",
                    "value": "14,912"
                },
                {
                    "rawValue": 34.763459999999995,
                    "value": "34.763459999999995"
                },
                {
                    "rawValue": "–77.503297",
                    "value": "–77.503297"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Davidson",
                    "value": "Davidson"
                },
                {
                    "rawValue": "14,829",
                    "value": "14,829"
                },
                {
                    "rawValue": 35.795123,
                    "value": "35.795123"
                },
                {
                    "rawValue": "–80.206525",
                    "value": "–80.206525"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McLean",
                    "value": "McLean"
                },
                {
                    "rawValue": "14,820",
                    "value": "14,820"
                },
                {
                    "rawValue": 40.494559,
                    "value": "40.494559"
                },
                {
                    "rawValue": "–88.844539",
                    "value": "–88.844539"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Muscogee",
                    "value": "Muscogee"
                },
                {
                    "rawValue": "14,774",
                    "value": "14,774"
                },
                {
                    "rawValue": 32.510197,
                    "value": "32.510197"
                },
                {
                    "rawValue": "–84.874946",
                    "value": "–84.874946"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sebastian",
                    "value": "Sebastian"
                },
                {
                    "rawValue": "14,768",
                    "value": "14,768"
                },
                {
                    "rawValue": 35.196981,
                    "value": "35.196981"
                },
                {
                    "rawValue": "–94.274989",
                    "value": "–94.274989"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Warren",
                    "value": "Warren"
                },
                {
                    "rawValue": "14,733",
                    "value": "14,733"
                },
                {
                    "rawValue": 36.995634,
                    "value": "36.995634"
                },
                {
                    "rawValue": "–86.423579",
                    "value": "–86.423579"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fairfield",
                    "value": "Fairfield"
                },
                {
                    "rawValue": "14,722",
                    "value": "14,722"
                },
                {
                    "rawValue": 39.752935,
                    "value": "39.752935"
                },
                {
                    "rawValue": "–82.628276",
                    "value": "–82.628276"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Burleigh",
                    "value": "Burleigh"
                },
                {
                    "rawValue": "14,721",
                    "value": "14,721"
                },
                {
                    "rawValue": 46.971843,
                    "value": "46.971843"
                },
                {
                    "rawValue": "–100.462001",
                    "value": "–100.462001"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kent",
                    "value": "Kent"
                },
                {
                    "rawValue": "14,710",
                    "value": "14,710"
                },
                {
                    "rawValue": 39.097088,
                    "value": "39.097088"
                },
                {
                    "rawValue": "–75.502982",
                    "value": "–75.502982"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wichita",
                    "value": "Wichita"
                },
                {
                    "rawValue": "14,691",
                    "value": "14,691"
                },
                {
                    "rawValue": 33.991103,
                    "value": "33.991103"
                },
                {
                    "rawValue": "–98.716851",
                    "value": "–98.716851"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cumberland",
                    "value": "Cumberland"
                },
                {
                    "rawValue": "14,628",
                    "value": "14,628"
                },
                {
                    "rawValue": 39.328387,
                    "value": "39.328387"
                },
                {
                    "rawValue": "–75.121644",
                    "value": "–75.121644"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sullivan",
                    "value": "Sullivan"
                },
                {
                    "rawValue": "14,615",
                    "value": "14,615"
                },
                {
                    "rawValue": 36.510212,
                    "value": "36.510212"
                },
                {
                    "rawValue": "–82.299397",
                    "value": "–82.299397"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "14,547",
                    "value": "14,547"
                },
                {
                    "rawValue": 42.248474,
                    "value": "42.248474"
                },
                {
                    "rawValue": "–84.420868",
                    "value": "–84.420868"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Trumbull",
                    "value": "Trumbull"
                },
                {
                    "rawValue": "14,506",
                    "value": "14,506"
                },
                {
                    "rawValue": 41.308935999999996,
                    "value": "41.308935999999996"
                },
                {
                    "rawValue": "–80.767656",
                    "value": "–80.767656"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lackawanna",
                    "value": "Lackawanna"
                },
                {
                    "rawValue": "14,374",
                    "value": "14,374"
                },
                {
                    "rawValue": 41.44025,
                    "value": "41.44025"
                },
                {
                    "rawValue": "–75.609587",
                    "value": "–75.609587"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clarke",
                    "value": "Clarke"
                },
                {
                    "rawValue": "14,358",
                    "value": "14,358"
                },
                {
                    "rawValue": 33.952234000000004,
                    "value": "33.952234000000004"
                },
                {
                    "rawValue": "–83.367130",
                    "value": "–83.367130"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Blount",
                    "value": "Blount"
                },
                {
                    "rawValue": "14,272",
                    "value": "14,272"
                },
                {
                    "rawValue": 35.688185,
                    "value": "35.688185"
                },
                {
                    "rawValue": "–83.922973",
                    "value": "–83.922973"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Butler",
                    "value": "Butler"
                },
                {
                    "rawValue": "14,240",
                    "value": "14,240"
                },
                {
                    "rawValue": 40.913834,
                    "value": "40.913834"
                },
                {
                    "rawValue": "–79.918960",
                    "value": "–79.918960"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "14,047",
                    "value": "14,047"
                },
                {
                    "rawValue": 40.200005,
                    "value": "40.200005"
                },
                {
                    "rawValue": "–80.252132",
                    "value": "–80.252132"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Calhoun",
                    "value": "Calhoun"
                },
                {
                    "rawValue": "13,989",
                    "value": "13,989"
                },
                {
                    "rawValue": 33.771706,
                    "value": "33.771706"
                },
                {
                    "rawValue": "–85.822513",
                    "value": "–85.822513"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Woodbury",
                    "value": "Woodbury"
                },
                {
                    "rawValue": "13,951",
                    "value": "13,951"
                },
                {
                    "rawValue": 42.39322,
                    "value": "42.39322"
                },
                {
                    "rawValue": "–96.053296",
                    "value": "–96.053296"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Morgan",
                    "value": "Morgan"
                },
                {
                    "rawValue": "13,827",
                    "value": "13,827"
                },
                {
                    "rawValue": 34.454484,
                    "value": "34.454484"
                },
                {
                    "rawValue": "–86.846402",
                    "value": "–86.846402"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Douglas",
                    "value": "Douglas"
                },
                {
                    "rawValue": "13,801",
                    "value": "13,801"
                },
                {
                    "rawValue": 33.699317,
                    "value": "33.699317"
                },
                {
                    "rawValue": "–84.765944",
                    "value": "–84.765944"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sheboygan",
                    "value": "Sheboygan"
                },
                {
                    "rawValue": "13,786",
                    "value": "13,786"
                },
                {
                    "rawValue": 43.746002000000004,
                    "value": "43.746002000000004"
                },
                {
                    "rawValue": "–87.730546",
                    "value": "–87.730546"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tazewell",
                    "value": "Tazewell"
                },
                {
                    "rawValue": "13,735",
                    "value": "13,735"
                },
                {
                    "rawValue": 40.508074,
                    "value": "40.508074"
                },
                {
                    "rawValue": "–89.516260",
                    "value": "–89.516260"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Houston",
                    "value": "Houston"
                },
                {
                    "rawValue": "13,714",
                    "value": "13,714"
                },
                {
                    "rawValue": 32.458381,
                    "value": "32.458381"
                },
                {
                    "rawValue": "–83.662856",
                    "value": "–83.662856"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Greene",
                    "value": "Greene"
                },
                {
                    "rawValue": "13,699",
                    "value": "13,699"
                },
                {
                    "rawValue": 39.687478999999996,
                    "value": "39.687478999999996"
                },
                {
                    "rawValue": "–83.894894",
                    "value": "–83.894894"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Medina",
                    "value": "Medina"
                },
                {
                    "rawValue": "13,662",
                    "value": "13,662"
                },
                {
                    "rawValue": 41.116051,
                    "value": "41.116051"
                },
                {
                    "rawValue": "–81.899566",
                    "value": "–81.899566"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Randolph",
                    "value": "Randolph"
                },
                {
                    "rawValue": "13,615",
                    "value": "13,615"
                },
                {
                    "rawValue": 35.709915,
                    "value": "35.709915"
                },
                {
                    "rawValue": "–79.806215",
                    "value": "–79.806215"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Juan",
                    "value": "San Juan"
                },
                {
                    "rawValue": "13,586",
                    "value": "13,586"
                },
                {
                    "rawValue": 36.511625,
                    "value": "36.511625"
                },
                {
                    "rawValue": "–108.324578",
                    "value": "–108.324578"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Scott",
                    "value": "Scott"
                },
                {
                    "rawValue": "13,568",
                    "value": "13,568"
                },
                {
                    "rawValue": 44.651932,
                    "value": "44.651932"
                },
                {
                    "rawValue": "–93.534553",
                    "value": "–93.534553"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clackamas",
                    "value": "Clackamas"
                },
                {
                    "rawValue": "13,566",
                    "value": "13,566"
                },
                {
                    "rawValue": 45.160493,
                    "value": "45.160493"
                },
                {
                    "rawValue": "–122.195127",
                    "value": "–122.195127"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Guadalupe",
                    "value": "Guadalupe"
                },
                {
                    "rawValue": "13,557",
                    "value": "13,557"
                },
                {
                    "rawValue": 29.583208000000003,
                    "value": "29.583208000000003"
                },
                {
                    "rawValue": "–97.949027",
                    "value": "–97.949027"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mesa",
                    "value": "Mesa"
                },
                {
                    "rawValue": "13,509",
                    "value": "13,509"
                },
                {
                    "rawValue": 39.019492,
                    "value": "39.019492"
                },
                {
                    "rawValue": "–108.461837",
                    "value": "–108.461837"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Arlington",
                    "value": "Arlington"
                },
                {
                    "rawValue": "13,501",
                    "value": "13,501"
                },
                {
                    "rawValue": 38.878337,
                    "value": "38.878337"
                },
                {
                    "rawValue": "–77.100703",
                    "value": "–77.100703"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Etowah",
                    "value": "Etowah"
                },
                {
                    "rawValue": "13,454",
                    "value": "13,454"
                },
                {
                    "rawValue": 34.047638,
                    "value": "34.047638"
                },
                {
                    "rawValue": "–86.034420",
                    "value": "–86.034420"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bartow",
                    "value": "Bartow"
                },
                {
                    "rawValue": "13,438",
                    "value": "13,438"
                },
                {
                    "rawValue": 34.240918,
                    "value": "34.240918"
                },
                {
                    "rawValue": "–84.838188",
                    "value": "–84.838188"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marin",
                    "value": "Marin"
                },
                {
                    "rawValue": "13,335",
                    "value": "13,335"
                },
                {
                    "rawValue": 38.051817,
                    "value": "38.051817"
                },
                {
                    "rawValue": "–122.745974",
                    "value": "–122.745974"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rock Island",
                    "value": "Rock Island"
                },
                {
                    "rawValue": "13,264",
                    "value": "13,264"
                },
                {
                    "rawValue": 41.468404,
                    "value": "41.468404"
                },
                {
                    "rawValue": "–90.572203",
                    "value": "–90.572203"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Boone",
                    "value": "Boone"
                },
                {
                    "rawValue": "13,262",
                    "value": "13,262"
                },
                {
                    "rawValue": 38.974595,
                    "value": "38.974595"
                },
                {
                    "rawValue": "–84.731444",
                    "value": "–84.731444"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coweta",
                    "value": "Coweta"
                },
                {
                    "rawValue": "13,250",
                    "value": "13,250"
                },
                {
                    "rawValue": 33.352897,
                    "value": "33.352897"
                },
                {
                    "rawValue": "–84.762138",
                    "value": "–84.762138"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Centre",
                    "value": "Centre"
                },
                {
                    "rawValue": "13,221",
                    "value": "13,221"
                },
                {
                    "rawValue": 40.90916,
                    "value": "40.90916"
                },
                {
                    "rawValue": "–77.847830",
                    "value": "–77.847830"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Johnson",
                    "value": "Johnson"
                },
                {
                    "rawValue": "13,212",
                    "value": "13,212"
                },
                {
                    "rawValue": 41.668737,
                    "value": "41.668737"
                },
                {
                    "rawValue": "–91.588812",
                    "value": "–91.588812"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bradley",
                    "value": "Bradley"
                },
                {
                    "rawValue": "13,210",
                    "value": "13,210"
                },
                {
                    "rawValue": 35.153914,
                    "value": "35.153914"
                },
                {
                    "rawValue": "–84.859414",
                    "value": "–84.859414"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fond du Lac",
                    "value": "Fond du Lac"
                },
                {
                    "rawValue": "13,132",
                    "value": "13,132"
                },
                {
                    "rawValue": 43.754721999999994,
                    "value": "43.754721999999994"
                },
                {
                    "rawValue": "–88.493284",
                    "value": "–88.493284"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bossier",
                    "value": "Bossier"
                },
                {
                    "rawValue": "13,110",
                    "value": "13,110"
                },
                {
                    "rawValue": 32.696202,
                    "value": "32.696202"
                },
                {
                    "rawValue": "–93.617977",
                    "value": "–93.617977"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lebanon",
                    "value": "Lebanon"
                },
                {
                    "rawValue": "13,090",
                    "value": "13,090"
                },
                {
                    "rawValue": 40.367344,
                    "value": "40.367344"
                },
                {
                    "rawValue": "–76.458009",
                    "value": "–76.458009"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pennington",
                    "value": "Pennington"
                },
                {
                    "rawValue": "13,026",
                    "value": "13,026"
                },
                {
                    "rawValue": 44.002349,
                    "value": "44.002349"
                },
                {
                    "rawValue": "–102.823802",
                    "value": "–102.823802"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Yolo",
                    "value": "Yolo"
                },
                {
                    "rawValue": "13,015",
                    "value": "13,015"
                },
                {
                    "rawValue": 38.679268,
                    "value": "38.679268"
                },
                {
                    "rawValue": "–121.903178",
                    "value": "–121.903178"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cumberland",
                    "value": "Cumberland"
                },
                {
                    "rawValue": "13,014",
                    "value": "13,014"
                },
                {
                    "rawValue": 43.808347999999995,
                    "value": "43.808347999999995"
                },
                {
                    "rawValue": "–70.330375",
                    "value": "–70.330375"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "La Crosse",
                    "value": "La Crosse"
                },
                {
                    "rawValue": "12,999",
                    "value": "12,999"
                },
                {
                    "rawValue": 43.908221999999995,
                    "value": "43.908221999999995"
                },
                {
                    "rawValue": "–91.111758",
                    "value": "–91.111758"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Craighead",
                    "value": "Craighead"
                },
                {
                    "rawValue": "12,933",
                    "value": "12,933"
                },
                {
                    "rawValue": 35.828268,
                    "value": "35.828268"
                },
                {
                    "rawValue": "–90.630411",
                    "value": "–90.630411"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "12,907",
                    "value": "12,907"
                },
                {
                    "rawValue": 36.295665,
                    "value": "36.295665"
                },
                {
                    "rawValue": "–82.495037",
                    "value": "–82.495037"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rankin",
                    "value": "Rankin"
                },
                {
                    "rawValue": "12,877",
                    "value": "12,877"
                },
                {
                    "rawValue": 32.262057,
                    "value": "32.262057"
                },
                {
                    "rawValue": "–89.946552",
                    "value": "–89.946552"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harford",
                    "value": "Harford"
                },
                {
                    "rawValue": "12,827",
                    "value": "12,827"
                },
                {
                    "rawValue": 39.537428999999996,
                    "value": "39.537428999999996"
                },
                {
                    "rawValue": "–76.299789",
                    "value": "–76.299789"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bonneville",
                    "value": "Bonneville"
                },
                {
                    "rawValue": "12,792",
                    "value": "12,792"
                },
                {
                    "rawValue": 43.395171000000005,
                    "value": "43.395171000000005"
                },
                {
                    "rawValue": "–111.621878",
                    "value": "–111.621878"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "12,784",
                    "value": "12,784"
                },
                {
                    "rawValue": 30.458491,
                    "value": "30.458491"
                },
                {
                    "rawValue": "–88.619991",
                    "value": "–88.619991"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Muskegon",
                    "value": "Muskegon"
                },
                {
                    "rawValue": "12,777",
                    "value": "12,777"
                },
                {
                    "rawValue": 43.289258000000004,
                    "value": "43.289258000000004"
                },
                {
                    "rawValue": "–86.751892",
                    "value": "–86.751892"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Franklin",
                    "value": "Franklin"
                },
                {
                    "rawValue": "12,767",
                    "value": "12,767"
                },
                {
                    "rawValue": 39.926686,
                    "value": "39.926686"
                },
                {
                    "rawValue": "–77.724485",
                    "value": "–77.724485"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wright",
                    "value": "Wright"
                },
                {
                    "rawValue": "12,707",
                    "value": "12,707"
                },
                {
                    "rawValue": 45.175090999999995,
                    "value": "45.175090999999995"
                },
                {
                    "rawValue": "–93.966397",
                    "value": "–93.966397"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kankakee",
                    "value": "Kankakee"
                },
                {
                    "rawValue": "12,655",
                    "value": "12,655"
                },
                {
                    "rawValue": 41.139494,
                    "value": "41.139494"
                },
                {
                    "rawValue": "–87.861125",
                    "value": "–87.861125"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gallatin",
                    "value": "Gallatin"
                },
                {
                    "rawValue": "12,608",
                    "value": "12,608"
                },
                {
                    "rawValue": 45.535559,
                    "value": "45.535559"
                },
                {
                    "rawValue": "–111.173443",
                    "value": "–111.173443"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "12,574",
                    "value": "12,574"
                },
                {
                    "rawValue": 39.603621000000004,
                    "value": "39.603621000000004"
                },
                {
                    "rawValue": "–77.814671",
                    "value": "–77.814671"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Beaver",
                    "value": "Beaver"
                },
                {
                    "rawValue": "12,561",
                    "value": "12,561"
                },
                {
                    "rawValue": 40.68414,
                    "value": "40.68414"
                },
                {
                    "rawValue": "–80.350721",
                    "value": "–80.350721"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Livingston",
                    "value": "Livingston"
                },
                {
                    "rawValue": "12,515",
                    "value": "12,515"
                },
                {
                    "rawValue": 30.440419,
                    "value": "30.440419"
                },
                {
                    "rawValue": "–90.727474",
                    "value": "–90.727474"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dubuque",
                    "value": "Dubuque"
                },
                {
                    "rawValue": "12,482",
                    "value": "12,482"
                },
                {
                    "rawValue": 42.463481,
                    "value": "42.463481"
                },
                {
                    "rawValue": "–90.878771",
                    "value": "–90.878771"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clark",
                    "value": "Clark"
                },
                {
                    "rawValue": "12,453",
                    "value": "12,453"
                },
                {
                    "rawValue": 39.917032,
                    "value": "39.917032"
                },
                {
                    "rawValue": "–83.783676",
                    "value": "–83.783676"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Saratoga",
                    "value": "Saratoga"
                },
                {
                    "rawValue": "12,338",
                    "value": "12,338"
                },
                {
                    "rawValue": 43.106134999999995,
                    "value": "43.106134999999995"
                },
                {
                    "rawValue": "–73.855387",
                    "value": "–73.855387"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Comanche",
                    "value": "Comanche"
                },
                {
                    "rawValue": "12,323",
                    "value": "12,323"
                },
                {
                    "rawValue": 34.662628000000005,
                    "value": "34.662628000000005"
                },
                {
                    "rawValue": "–98.476597",
                    "value": "–98.476597"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Maury",
                    "value": "Maury"
                },
                {
                    "rawValue": "12,315",
                    "value": "12,315"
                },
                {
                    "rawValue": 35.615696,
                    "value": "35.615696"
                },
                {
                    "rawValue": "–87.077763",
                    "value": "–87.077763"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kanawha",
                    "value": "Kanawha"
                },
                {
                    "rawValue": "12,269",
                    "value": "12,269"
                },
                {
                    "rawValue": 38.328061,
                    "value": "38.328061"
                },
                {
                    "rawValue": "–81.523522",
                    "value": "–81.523522"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dodge",
                    "value": "Dodge"
                },
                {
                    "rawValue": "12,266",
                    "value": "12,266"
                },
                {
                    "rawValue": 43.422706,
                    "value": "43.422706"
                },
                {
                    "rawValue": "–88.704379",
                    "value": "–88.704379"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sevier",
                    "value": "Sevier"
                },
                {
                    "rawValue": "12,252",
                    "value": "12,252"
                },
                {
                    "rawValue": 35.791284000000005,
                    "value": "35.791284000000005"
                },
                {
                    "rawValue": "–83.521955",
                    "value": "–83.521955"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Schuylkill",
                    "value": "Schuylkill"
                },
                {
                    "rawValue": "12,241",
                    "value": "12,241"
                },
                {
                    "rawValue": 40.70369,
                    "value": "40.70369"
                },
                {
                    "rawValue": "–76.217800",
                    "value": "–76.217800"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clark",
                    "value": "Clark"
                },
                {
                    "rawValue": "12,134",
                    "value": "12,134"
                },
                {
                    "rawValue": 38.476217,
                    "value": "38.476217"
                },
                {
                    "rawValue": "–85.711122",
                    "value": "–85.711122"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tangipahoa",
                    "value": "Tangipahoa"
                },
                {
                    "rawValue": "12,104",
                    "value": "12,104"
                },
                {
                    "rawValue": 30.621581,
                    "value": "30.621581"
                },
                {
                    "rawValue": "–90.406633",
                    "value": "–90.406633"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McKinley",
                    "value": "McKinley"
                },
                {
                    "rawValue": "12,083",
                    "value": "12,083"
                },
                {
                    "rawValue": 35.573732,
                    "value": "35.573732"
                },
                {
                    "rawValue": "–108.255307",
                    "value": "–108.255307"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Olmsted",
                    "value": "Olmsted"
                },
                {
                    "rawValue": "11,944",
                    "value": "11,944"
                },
                {
                    "rawValue": 44.00343,
                    "value": "44.00343"
                },
                {
                    "rawValue": "–92.406722",
                    "value": "–92.406722"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Faulkner",
                    "value": "Faulkner"
                },
                {
                    "rawValue": "11,931",
                    "value": "11,931"
                },
                {
                    "rawValue": 35.146356,
                    "value": "35.146356"
                },
                {
                    "rawValue": "–92.324654",
                    "value": "–92.324654"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lowndes",
                    "value": "Lowndes"
                },
                {
                    "rawValue": "11,906",
                    "value": "11,906"
                },
                {
                    "rawValue": 30.833679999999998,
                    "value": "30.833679999999998"
                },
                {
                    "rawValue": "–83.268967",
                    "value": "–83.268967"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cambria",
                    "value": "Cambria"
                },
                {
                    "rawValue": "11,884",
                    "value": "11,884"
                },
                {
                    "rawValue": 40.494127,
                    "value": "40.494127"
                },
                {
                    "rawValue": "–78.715284",
                    "value": "–78.715284"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "11,868",
                    "value": "11,868"
                },
                {
                    "rawValue": 40.166203,
                    "value": "40.166203"
                },
                {
                    "rawValue": "–85.722454",
                    "value": "–85.722454"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Newport News city",
                    "value": "Newport News city"
                },
                {
                    "rawValue": "11,838",
                    "value": "11,838"
                },
                {
                    "rawValue": 37.075978000000006,
                    "value": "37.075978000000006"
                },
                {
                    "rawValue": "–76.521719",
                    "value": "–76.521719"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Berrien",
                    "value": "Berrien"
                },
                {
                    "rawValue": "11,831",
                    "value": "11,831"
                },
                {
                    "rawValue": 41.792639,
                    "value": "41.792639"
                },
                {
                    "rawValue": "–86.741822",
                    "value": "–86.741822"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wood",
                    "value": "Wood"
                },
                {
                    "rawValue": "11,762",
                    "value": "11,762"
                },
                {
                    "rawValue": 41.360183,
                    "value": "41.360183"
                },
                {
                    "rawValue": "–83.622682",
                    "value": "–83.622682"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Vigo",
                    "value": "Vigo"
                },
                {
                    "rawValue": "11,740",
                    "value": "11,740"
                },
                {
                    "rawValue": 39.429142999999996,
                    "value": "39.429142999999996"
                },
                {
                    "rawValue": "–87.390375",
                    "value": "–87.390375"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kendall",
                    "value": "Kendall"
                },
                {
                    "rawValue": "11,722",
                    "value": "11,722"
                },
                {
                    "rawValue": 41.58814,
                    "value": "41.58814"
                },
                {
                    "rawValue": "–88.430626",
                    "value": "–88.430626"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hernando",
                    "value": "Hernando"
                },
                {
                    "rawValue": "11,696",
                    "value": "11,696"
                },
                {
                    "rawValue": 28.567911,
                    "value": "28.567911"
                },
                {
                    "rawValue": "–82.464835",
                    "value": "–82.464835"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Saline",
                    "value": "Saline"
                },
                {
                    "rawValue": "11,540",
                    "value": "11,540"
                },
                {
                    "rawValue": 34.648525,
                    "value": "34.648525"
                },
                {
                    "rawValue": "–92.674463",
                    "value": "–92.674463"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marshall",
                    "value": "Marshall"
                },
                {
                    "rawValue": "11,475",
                    "value": "11,475"
                },
                {
                    "rawValue": 34.309564,
                    "value": "34.309564"
                },
                {
                    "rawValue": "–86.321668",
                    "value": "–86.321668"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Litchfield",
                    "value": "Litchfield"
                },
                {
                    "rawValue": "11,469",
                    "value": "11,469"
                },
                {
                    "rawValue": 41.791897,
                    "value": "41.791897"
                },
                {
                    "rawValue": "–73.235428",
                    "value": "–73.235428"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Eau Claire",
                    "value": "Eau Claire"
                },
                {
                    "rawValue": "11,421",
                    "value": "11,421"
                },
                {
                    "rawValue": 44.726355,
                    "value": "44.726355"
                },
                {
                    "rawValue": "–91.286414",
                    "value": "–91.286414"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cochise",
                    "value": "Cochise"
                },
                {
                    "rawValue": "11,359",
                    "value": "11,359"
                },
                {
                    "rawValue": 31.881793,
                    "value": "31.881793"
                },
                {
                    "rawValue": "–109.754120",
                    "value": "–109.754120"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rapides",
                    "value": "Rapides"
                },
                {
                    "rawValue": "11,347",
                    "value": "11,347"
                },
                {
                    "rawValue": 31.193203999999998,
                    "value": "31.193203999999998"
                },
                {
                    "rawValue": "–92.535953",
                    "value": "–92.535953"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walworth",
                    "value": "Walworth"
                },
                {
                    "rawValue": "11,323",
                    "value": "11,323"
                },
                {
                    "rawValue": 42.66811,
                    "value": "42.66811"
                },
                {
                    "rawValue": "–88.541731",
                    "value": "–88.541731"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Franklin",
                    "value": "Franklin"
                },
                {
                    "rawValue": "11,289",
                    "value": "11,289"
                },
                {
                    "rawValue": 46.53458,
                    "value": "46.53458"
                },
                {
                    "rawValue": "–118.906944",
                    "value": "–118.906944"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Floyd",
                    "value": "Floyd"
                },
                {
                    "rawValue": "11,280",
                    "value": "11,280"
                },
                {
                    "rawValue": 34.263677,
                    "value": "34.263677"
                },
                {
                    "rawValue": "–85.213730",
                    "value": "–85.213730"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Indian River",
                    "value": "Indian River"
                },
                {
                    "rawValue": "11,264",
                    "value": "11,264"
                },
                {
                    "rawValue": 27.700638,
                    "value": "27.700638"
                },
                {
                    "rawValue": "–80.574803",
                    "value": "–80.574803"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Portage",
                    "value": "Portage"
                },
                {
                    "rawValue": "11,217",
                    "value": "11,217"
                },
                {
                    "rawValue": 41.16864,
                    "value": "41.16864"
                },
                {
                    "rawValue": "–81.196932",
                    "value": "–81.196932"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Flathead",
                    "value": "Flathead"
                },
                {
                    "rawValue": "11,201",
                    "value": "11,201"
                },
                {
                    "rawValue": 48.314696000000005,
                    "value": "48.314696000000005"
                },
                {
                    "rawValue": "–114.054319",
                    "value": "–114.054319"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shasta",
                    "value": "Shasta"
                },
                {
                    "rawValue": "11,149",
                    "value": "11,149"
                },
                {
                    "rawValue": 40.760521999999995,
                    "value": "40.760521999999995"
                },
                {
                    "rawValue": "–122.043550",
                    "value": "–122.043550"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ascension",
                    "value": "Ascension"
                },
                {
                    "rawValue": "11,122",
                    "value": "11,122"
                },
                {
                    "rawValue": 30.202946,
                    "value": "30.202946"
                },
                {
                    "rawValue": "–90.910023",
                    "value": "–90.910023"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Schenectady",
                    "value": "Schenectady"
                },
                {
                    "rawValue": "11,093",
                    "value": "11,093"
                },
                {
                    "rawValue": 42.817541999999996,
                    "value": "42.817541999999996"
                },
                {
                    "rawValue": "–74.043583",
                    "value": "–74.043583"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Butte",
                    "value": "Butte"
                },
                {
                    "rawValue": "11,092",
                    "value": "11,092"
                },
                {
                    "rawValue": 39.665959,
                    "value": "39.665959"
                },
                {
                    "rawValue": "–121.601919",
                    "value": "–121.601919"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sandoval",
                    "value": "Sandoval"
                },
                {
                    "rawValue": "11,006",
                    "value": "11,006"
                },
                {
                    "rawValue": 35.685072999999996,
                    "value": "35.685072999999996"
                },
                {
                    "rawValue": "–106.882618",
                    "value": "–106.882618"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "LaSalle",
                    "value": "LaSalle"
                },
                {
                    "rawValue": "10,967",
                    "value": "10,967"
                },
                {
                    "rawValue": 41.343340999999995,
                    "value": "41.343340999999995"
                },
                {
                    "rawValue": "–88.885931",
                    "value": "–88.885931"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grayson",
                    "value": "Grayson"
                },
                {
                    "rawValue": "10,920",
                    "value": "10,920"
                },
                {
                    "rawValue": 33.624508,
                    "value": "33.624508"
                },
                {
                    "rawValue": "–96.675699",
                    "value": "–96.675699"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Charlotte",
                    "value": "Charlotte"
                },
                {
                    "rawValue": "10,907",
                    "value": "10,907"
                },
                {
                    "rawValue": 26.868826000000002,
                    "value": "26.868826000000002"
                },
                {
                    "rawValue": "–81.940858",
                    "value": "–81.940858"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Martin",
                    "value": "Martin"
                },
                {
                    "rawValue": "10,846",
                    "value": "10,846"
                },
                {
                    "rawValue": 27.079953999999997,
                    "value": "27.079953999999997"
                },
                {
                    "rawValue": "–80.398211",
                    "value": "–80.398211"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Allen",
                    "value": "Allen"
                },
                {
                    "rawValue": "10,838",
                    "value": "10,838"
                },
                {
                    "rawValue": 40.771528,
                    "value": "40.771528"
                },
                {
                    "rawValue": "–84.106546",
                    "value": "–84.106546"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rockwall",
                    "value": "Rockwall"
                },
                {
                    "rawValue": "10,782",
                    "value": "10,782"
                },
                {
                    "rawValue": 32.889216,
                    "value": "32.889216"
                },
                {
                    "rawValue": "–96.407501",
                    "value": "–96.407501"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Blair",
                    "value": "Blair"
                },
                {
                    "rawValue": "10,753",
                    "value": "10,753"
                },
                {
                    "rawValue": 40.497926,
                    "value": "40.497926"
                },
                {
                    "rawValue": "–78.310640",
                    "value": "–78.310640"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gregg",
                    "value": "Gregg"
                },
                {
                    "rawValue": "10,743",
                    "value": "10,743"
                },
                {
                    "rawValue": 32.486397,
                    "value": "32.486397"
                },
                {
                    "rawValue": "–94.816276",
                    "value": "–94.816276"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Livingston",
                    "value": "Livingston"
                },
                {
                    "rawValue": "10,734",
                    "value": "10,734"
                },
                {
                    "rawValue": 42.602532000000004,
                    "value": "42.602532000000004"
                },
                {
                    "rawValue": "–83.911718",
                    "value": "–83.911718"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Middlesex",
                    "value": "Middlesex"
                },
                {
                    "rawValue": "10,726",
                    "value": "10,726"
                },
                {
                    "rawValue": 41.434525,
                    "value": "41.434525"
                },
                {
                    "rawValue": "–72.524227",
                    "value": "–72.524227"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Putnam",
                    "value": "Putnam"
                },
                {
                    "rawValue": "10,705",
                    "value": "10,705"
                },
                {
                    "rawValue": 36.140807,
                    "value": "36.140807"
                },
                {
                    "rawValue": "–85.496928",
                    "value": "–85.496928"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carroll",
                    "value": "Carroll"
                },
                {
                    "rawValue": "10,692",
                    "value": "10,692"
                },
                {
                    "rawValue": 33.582237,
                    "value": "33.582237"
                },
                {
                    "rawValue": "–85.080527",
                    "value": "–85.080527"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Apache",
                    "value": "Apache"
                },
                {
                    "rawValue": "10,662",
                    "value": "10,662"
                },
                {
                    "rawValue": 35.385845,
                    "value": "35.385845"
                },
                {
                    "rawValue": "–109.493747",
                    "value": "–109.493747"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fayette",
                    "value": "Fayette"
                },
                {
                    "rawValue": "10,657",
                    "value": "10,657"
                },
                {
                    "rawValue": 39.914115,
                    "value": "39.914115"
                },
                {
                    "rawValue": "–79.644586",
                    "value": "–79.644586"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cleveland",
                    "value": "Cleveland"
                },
                {
                    "rawValue": "10,496",
                    "value": "10,496"
                },
                {
                    "rawValue": 35.33463,
                    "value": "35.33463"
                },
                {
                    "rawValue": "–81.557115",
                    "value": "–81.557115"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Alexandria city",
                    "value": "Alexandria city"
                },
                {
                    "rawValue": "10,490",
                    "value": "10,490"
                },
                {
                    "rawValue": 38.818343,
                    "value": "38.818343"
                },
                {
                    "rawValue": "–77.082026",
                    "value": "–77.082026"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "10,477",
                    "value": "10,477"
                },
                {
                    "rawValue": 39.160751,
                    "value": "39.160751"
                },
                {
                    "rawValue": "–86.523325",
                    "value": "–86.523325"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ulster",
                    "value": "Ulster"
                },
                {
                    "rawValue": "10,474",
                    "value": "10,474"
                },
                {
                    "rawValue": 41.947232,
                    "value": "41.947232"
                },
                {
                    "rawValue": "–74.265447",
                    "value": "–74.265447"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Barnstable",
                    "value": "Barnstable"
                },
                {
                    "rawValue": "10,452",
                    "value": "10,452"
                },
                {
                    "rawValue": 41.798819,
                    "value": "41.798819"
                },
                {
                    "rawValue": "–70.211083",
                    "value": "–70.211083"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lane",
                    "value": "Lane"
                },
                {
                    "rawValue": "10,435",
                    "value": "10,435"
                },
                {
                    "rawValue": 43.928276000000004,
                    "value": "43.928276000000004"
                },
                {
                    "rawValue": "–122.897678",
                    "value": "–122.897678"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Richland",
                    "value": "Richland"
                },
                {
                    "rawValue": "10,425",
                    "value": "10,425"
                },
                {
                    "rawValue": 40.774167,
                    "value": "40.774167"
                },
                {
                    "rawValue": "–82.542715",
                    "value": "–82.542715"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wayne",
                    "value": "Wayne"
                },
                {
                    "rawValue": "10,367",
                    "value": "10,367"
                },
                {
                    "rawValue": 35.362741,
                    "value": "35.362741"
                },
                {
                    "rawValue": "–78.004826",
                    "value": "–78.004826"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dallas",
                    "value": "Dallas"
                },
                {
                    "rawValue": "10,300",
                    "value": "10,300"
                },
                {
                    "rawValue": 41.685321,
                    "value": "41.685321"
                },
                {
                    "rawValue": "–94.040707",
                    "value": "–94.040707"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Maverick",
                    "value": "Maverick"
                },
                {
                    "rawValue": "10,235",
                    "value": "10,235"
                },
                {
                    "rawValue": 28.745216999999997,
                    "value": "28.745216999999997"
                },
                {
                    "rawValue": "–100.311368",
                    "value": "–100.311368"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bayamon",
                    "value": "Bayamon"
                },
                {
                    "rawValue": "10,207",
                    "value": "10,207"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "10,182",
                    "value": "10,182"
                },
                {
                    "rawValue": 41.916097,
                    "value": "41.916097"
                },
                {
                    "rawValue": "–83.487106",
                    "value": "–83.487106"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "10,174",
                    "value": "10,174"
                },
                {
                    "rawValue": 35.606056,
                    "value": "35.606056"
                },
                {
                    "rawValue": "–88.833424",
                    "value": "–88.833424"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Houston",
                    "value": "Houston"
                },
                {
                    "rawValue": "10,165",
                    "value": "10,165"
                },
                {
                    "rawValue": 31.158193,
                    "value": "31.158193"
                },
                {
                    "rawValue": "–85.296398",
                    "value": "–85.296398"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Buchanan",
                    "value": "Buchanan"
                },
                {
                    "rawValue": "10,137",
                    "value": "10,137"
                },
                {
                    "rawValue": 39.66037,
                    "value": "39.66037"
                },
                {
                    "rawValue": "–94.808173",
                    "value": "–94.808173"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "10,100",
                    "value": "10,100"
                },
                {
                    "rawValue": 41.056233,
                    "value": "41.056233"
                },
                {
                    "rawValue": "–75.329037",
                    "value": "–75.329037"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Franklin",
                    "value": "Franklin"
                },
                {
                    "rawValue": "10,093",
                    "value": "10,093"
                },
                {
                    "rawValue": 38.408313,
                    "value": "38.408313"
                },
                {
                    "rawValue": "–91.073410",
                    "value": "–91.073410"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Miami",
                    "value": "Miami"
                },
                {
                    "rawValue": "10,083",
                    "value": "10,083"
                },
                {
                    "rawValue": 40.053326,
                    "value": "40.053326"
                },
                {
                    "rawValue": "–84.228414",
                    "value": "–84.228414"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rogers",
                    "value": "Rogers"
                },
                {
                    "rawValue": "9,996",
                    "value": "9,996"
                },
                {
                    "rawValue": 36.378082,
                    "value": "36.378082"
                },
                {
                    "rawValue": "–95.601337",
                    "value": "–95.601337"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Newton",
                    "value": "Newton"
                },
                {
                    "rawValue": "9,977",
                    "value": "9,977"
                },
                {
                    "rawValue": 33.544046,
                    "value": "33.544046"
                },
                {
                    "rawValue": "–83.855189",
                    "value": "–83.855189"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Calhoun",
                    "value": "Calhoun"
                },
                {
                    "rawValue": "9,973",
                    "value": "9,973"
                },
                {
                    "rawValue": 42.24299,
                    "value": "42.24299"
                },
                {
                    "rawValue": "–85.012385",
                    "value": "–85.012385"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Delaware",
                    "value": "Delaware"
                },
                {
                    "rawValue": "9,945",
                    "value": "9,945"
                },
                {
                    "rawValue": 40.227165,
                    "value": "40.227165"
                },
                {
                    "rawValue": "–85.398856",
                    "value": "–85.398856"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Nash",
                    "value": "Nash"
                },
                {
                    "rawValue": "9,943",
                    "value": "9,943"
                },
                {
                    "rawValue": 35.965945,
                    "value": "35.965945"
                },
                {
                    "rawValue": "–77.987555",
                    "value": "–77.987555"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pottawattamie",
                    "value": "Pottawattamie"
                },
                {
                    "rawValue": "9,933",
                    "value": "9,933"
                },
                {
                    "rawValue": 41.340184,
                    "value": "41.340184"
                },
                {
                    "rawValue": "–95.544905",
                    "value": "–95.544905"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harnett",
                    "value": "Harnett"
                },
                {
                    "rawValue": "9,933",
                    "value": "9,933"
                },
                {
                    "rawValue": 35.368635,
                    "value": "35.368635"
                },
                {
                    "rawValue": "–78.871610",
                    "value": "–78.871610"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walton",
                    "value": "Walton"
                },
                {
                    "rawValue": "9,927",
                    "value": "9,927"
                },
                {
                    "rawValue": 33.782649,
                    "value": "33.782649"
                },
                {
                    "rawValue": "–83.734215",
                    "value": "–83.734215"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Citrus",
                    "value": "Citrus"
                },
                {
                    "rawValue": "9,925",
                    "value": "9,925"
                },
                {
                    "rawValue": 28.843628000000002,
                    "value": "28.843628000000002"
                },
                {
                    "rawValue": "–82.524796",
                    "value": "–82.524796"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Santa Fe",
                    "value": "Santa Fe"
                },
                {
                    "rawValue": "9,899",
                    "value": "9,899"
                },
                {
                    "rawValue": 35.513721999999994,
                    "value": "35.513721999999994"
                },
                {
                    "rawValue": "–105.966441",
                    "value": "–105.966441"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Berkeley",
                    "value": "Berkeley"
                },
                {
                    "rawValue": "9,897",
                    "value": "9,897"
                },
                {
                    "rawValue": 39.457854,
                    "value": "39.457854"
                },
                {
                    "rawValue": "–78.032338",
                    "value": "–78.032338"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Garland",
                    "value": "Garland"
                },
                {
                    "rawValue": "9,881",
                    "value": "9,881"
                },
                {
                    "rawValue": 34.578860999999996,
                    "value": "34.578860999999996"
                },
                {
                    "rawValue": "–93.146915",
                    "value": "–93.146915"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "LaPorte",
                    "value": "LaPorte"
                },
                {
                    "rawValue": "9,877",
                    "value": "9,877"
                },
                {
                    "rawValue": 41.549011,
                    "value": "41.549011"
                },
                {
                    "rawValue": "–86.744729",
                    "value": "–86.744729"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Daviess",
                    "value": "Daviess"
                },
                {
                    "rawValue": "9,851",
                    "value": "9,851"
                },
                {
                    "rawValue": 37.731671,
                    "value": "37.731671"
                },
                {
                    "rawValue": "–87.087139",
                    "value": "–87.087139"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grand Forks",
                    "value": "Grand Forks"
                },
                {
                    "rawValue": "9,844",
                    "value": "9,844"
                },
                {
                    "rawValue": 47.926003,
                    "value": "47.926003"
                },
                {
                    "rawValue": "–97.450851",
                    "value": "–97.450851"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "York",
                    "value": "York"
                },
                {
                    "rawValue": "9,814",
                    "value": "9,814"
                },
                {
                    "rawValue": 43.427239,
                    "value": "43.427239"
                },
                {
                    "rawValue": "–70.670402",
                    "value": "–70.670402"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lancaster",
                    "value": "Lancaster"
                },
                {
                    "rawValue": "9,745",
                    "value": "9,745"
                },
                {
                    "rawValue": 34.686818,
                    "value": "34.686818"
                },
                {
                    "rawValue": "–80.703689",
                    "value": "–80.703689"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lee",
                    "value": "Lee"
                },
                {
                    "rawValue": "9,736",
                    "value": "9,736"
                },
                {
                    "rawValue": 34.288965000000005,
                    "value": "34.288965000000005"
                },
                {
                    "rawValue": "–88.680887",
                    "value": "–88.680887"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stafford",
                    "value": "Stafford"
                },
                {
                    "rawValue": "9,736",
                    "value": "9,736"
                },
                {
                    "rawValue": 38.418933,
                    "value": "38.418933"
                },
                {
                    "rawValue": "–77.459043",
                    "value": "–77.459043"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Story",
                    "value": "Story"
                },
                {
                    "rawValue": "9,722",
                    "value": "9,722"
                },
                {
                    "rawValue": 42.037538,
                    "value": "42.037538"
                },
                {
                    "rawValue": "–93.466093",
                    "value": "–93.466093"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clay",
                    "value": "Clay"
                },
                {
                    "rawValue": "9,705",
                    "value": "9,705"
                },
                {
                    "rawValue": 39.315551,
                    "value": "39.315551"
                },
                {
                    "rawValue": "–94.421502",
                    "value": "–94.421502"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sumter",
                    "value": "Sumter"
                },
                {
                    "rawValue": "9,689",
                    "value": "9,689"
                },
                {
                    "rawValue": 33.916046,
                    "value": "33.916046"
                },
                {
                    "rawValue": "–80.382472",
                    "value": "–80.382472"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Terrebonne",
                    "value": "Terrebonne"
                },
                {
                    "rawValue": "9,682",
                    "value": "9,682"
                },
                {
                    "rawValue": 29.333266,
                    "value": "29.333266"
                },
                {
                    "rawValue": "–90.844191",
                    "value": "–90.844191"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sussex",
                    "value": "Sussex"
                },
                {
                    "rawValue": "9,660",
                    "value": "9,660"
                },
                {
                    "rawValue": 41.137423999999996,
                    "value": "41.137423999999996"
                },
                {
                    "rawValue": "–74.691855",
                    "value": "–74.691855"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Macon",
                    "value": "Macon"
                },
                {
                    "rawValue": "9,601",
                    "value": "9,601"
                },
                {
                    "rawValue": 39.860237,
                    "value": "39.860237"
                },
                {
                    "rawValue": "–88.961529",
                    "value": "–88.961529"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Elmore",
                    "value": "Elmore"
                },
                {
                    "rawValue": "9,578",
                    "value": "9,578"
                },
                {
                    "rawValue": 32.597229,
                    "value": "32.597229"
                },
                {
                    "rawValue": "–86.142739",
                    "value": "–86.142739"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "9,569",
                    "value": "9,569"
                },
                {
                    "rawValue": 32.634370000000004,
                    "value": "32.634370000000004"
                },
                {
                    "rawValue": "–90.034160",
                    "value": "–90.034160"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lycoming",
                    "value": "Lycoming"
                },
                {
                    "rawValue": "9,552",
                    "value": "9,552"
                },
                {
                    "rawValue": 41.343624,
                    "value": "41.343624"
                },
                {
                    "rawValue": "–77.055253",
                    "value": "–77.055253"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Limestone",
                    "value": "Limestone"
                },
                {
                    "rawValue": "9,454",
                    "value": "9,454"
                },
                {
                    "rawValue": 34.810239,
                    "value": "34.810239"
                },
                {
                    "rawValue": "–86.981400",
                    "value": "–86.981400"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Windham",
                    "value": "Windham"
                },
                {
                    "rawValue": "9,392",
                    "value": "9,392"
                },
                {
                    "rawValue": 41.824999,
                    "value": "41.824999"
                },
                {
                    "rawValue": "–71.990702",
                    "value": "–71.990702"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Comal",
                    "value": "Comal"
                },
                {
                    "rawValue": "9,348",
                    "value": "9,348"
                },
                {
                    "rawValue": 29.803019,
                    "value": "29.803019"
                },
                {
                    "rawValue": "–98.255201",
                    "value": "–98.255201"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Burke",
                    "value": "Burke"
                },
                {
                    "rawValue": "9,336",
                    "value": "9,336"
                },
                {
                    "rawValue": 35.746182,
                    "value": "35.746182"
                },
                {
                    "rawValue": "–81.706180",
                    "value": "–81.706180"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cape Girardeau",
                    "value": "Cape Girardeau"
                },
                {
                    "rawValue": "9,321",
                    "value": "9,321"
                },
                {
                    "rawValue": 37.383882,
                    "value": "37.383882"
                },
                {
                    "rawValue": "–89.684908",
                    "value": "–89.684908"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rensselaer",
                    "value": "Rensselaer"
                },
                {
                    "rawValue": "9,310",
                    "value": "9,310"
                },
                {
                    "rawValue": 42.710421000000004,
                    "value": "42.710421000000004"
                },
                {
                    "rawValue": "–73.513845",
                    "value": "–73.513845"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "9,281",
                    "value": "9,281"
                },
                {
                    "rawValue": 34.134157,
                    "value": "34.134157"
                },
                {
                    "rawValue": "–83.565133",
                    "value": "–83.565133"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lafourche",
                    "value": "Lafourche"
                },
                {
                    "rawValue": "9,250",
                    "value": "9,250"
                },
                {
                    "rawValue": 29.491993,
                    "value": "29.491993"
                },
                {
                    "rawValue": "–90.394849",
                    "value": "–90.394849"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jasper",
                    "value": "Jasper"
                },
                {
                    "rawValue": "9,245",
                    "value": "9,245"
                },
                {
                    "rawValue": 37.200865,
                    "value": "37.200865"
                },
                {
                    "rawValue": "–94.338869",
                    "value": "–94.338869"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ward",
                    "value": "Ward"
                },
                {
                    "rawValue": "9,240",
                    "value": "9,240"
                },
                {
                    "rawValue": 48.216685999999996,
                    "value": "48.216685999999996"
                },
                {
                    "rawValue": "–101.540537",
                    "value": "–101.540537"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "El Dorado",
                    "value": "El Dorado"
                },
                {
                    "rawValue": "9,198",
                    "value": "9,198"
                },
                {
                    "rawValue": 38.785532,
                    "value": "38.785532"
                },
                {
                    "rawValue": "–120.534398",
                    "value": "–120.534398"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Barrow",
                    "value": "Barrow"
                },
                {
                    "rawValue": "9,170",
                    "value": "9,170"
                },
                {
                    "rawValue": 33.992009,
                    "value": "33.992009"
                },
                {
                    "rawValue": "–83.712303",
                    "value": "–83.712303"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Howard",
                    "value": "Howard"
                },
                {
                    "rawValue": "9,166",
                    "value": "9,166"
                },
                {
                    "rawValue": 40.483537,
                    "value": "40.483537"
                },
                {
                    "rawValue": "–86.114118",
                    "value": "–86.114118"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Napa",
                    "value": "Napa"
                },
                {
                    "rawValue": "9,156",
                    "value": "9,156"
                },
                {
                    "rawValue": 38.507351,
                    "value": "38.507351"
                },
                {
                    "rawValue": "–122.325995",
                    "value": "–122.325995"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Muskogee",
                    "value": "Muskogee"
                },
                {
                    "rawValue": "9,149",
                    "value": "9,149"
                },
                {
                    "rawValue": 35.617551,
                    "value": "35.617551"
                },
                {
                    "rawValue": "–95.383911",
                    "value": "–95.383911"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Charles",
                    "value": "Charles"
                },
                {
                    "rawValue": "9,134",
                    "value": "9,134"
                },
                {
                    "rawValue": 38.472853,
                    "value": "38.472853"
                },
                {
                    "rawValue": "–77.015427",
                    "value": "–77.015427"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Clair",
                    "value": "St. Clair"
                },
                {
                    "rawValue": "9,100",
                    "value": "9,100"
                },
                {
                    "rawValue": 33.712963,
                    "value": "33.712963"
                },
                {
                    "rawValue": "–86.315663",
                    "value": "–86.315663"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Henderson",
                    "value": "Henderson"
                },
                {
                    "rawValue": "9,077",
                    "value": "9,077"
                },
                {
                    "rawValue": 35.336424,
                    "value": "35.336424"
                },
                {
                    "rawValue": "–82.479634",
                    "value": "–82.479634"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Robertson",
                    "value": "Robertson"
                },
                {
                    "rawValue": "9,075",
                    "value": "9,075"
                },
                {
                    "rawValue": 36.52753,
                    "value": "36.52753"
                },
                {
                    "rawValue": "–86.869377",
                    "value": "–86.869377"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grant",
                    "value": "Grant"
                },
                {
                    "rawValue": "9,064",
                    "value": "9,064"
                },
                {
                    "rawValue": 47.213633,
                    "value": "47.213633"
                },
                {
                    "rawValue": "–119.467788",
                    "value": "–119.467788"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Twin Falls",
                    "value": "Twin Falls"
                },
                {
                    "rawValue": "9,054",
                    "value": "9,054"
                },
                {
                    "rawValue": 42.352309000000005,
                    "value": "42.352309000000005"
                },
                {
                    "rawValue": "–114.665639",
                    "value": "–114.665639"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Clair",
                    "value": "St. Clair"
                },
                {
                    "rawValue": "9,044",
                    "value": "9,044"
                },
                {
                    "rawValue": 42.928804,
                    "value": "42.928804"
                },
                {
                    "rawValue": "–82.668914",
                    "value": "–82.668914"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cullman",
                    "value": "Cullman"
                },
                {
                    "rawValue": "9,042",
                    "value": "9,042"
                },
                {
                    "rawValue": 34.131923,
                    "value": "34.131923"
                },
                {
                    "rawValue": "–86.869267",
                    "value": "–86.869267"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Starr",
                    "value": "Starr"
                },
                {
                    "rawValue": "9,020",
                    "value": "9,020"
                },
                {
                    "rawValue": 26.546335,
                    "value": "26.546335"
                },
                {
                    "rawValue": "–98.715803",
                    "value": "–98.715803"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Matanuska-Susitna Borough",
                    "value": "Matanuska-Susitna Borough"
                },
                {
                    "rawValue": "9,008",
                    "value": "9,008"
                },
                {
                    "rawValue": 62.182173999999996,
                    "value": "62.182173999999996"
                },
                {
                    "rawValue": "–149.407974",
                    "value": "–149.407974"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hardin",
                    "value": "Hardin"
                },
                {
                    "rawValue": "8,995",
                    "value": "8,995"
                },
                {
                    "rawValue": 37.695836,
                    "value": "37.695836"
                },
                {
                    "rawValue": "–85.963183",
                    "value": "–85.963183"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cole",
                    "value": "Cole"
                },
                {
                    "rawValue": "8,963",
                    "value": "8,963"
                },
                {
                    "rawValue": 38.506847,
                    "value": "38.506847"
                },
                {
                    "rawValue": "–92.271404",
                    "value": "–92.271404"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sutter",
                    "value": "Sutter"
                },
                {
                    "rawValue": "8,962",
                    "value": "8,962"
                },
                {
                    "rawValue": 39.035257,
                    "value": "39.035257"
                },
                {
                    "rawValue": "–121.702758",
                    "value": "–121.702758"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lincoln",
                    "value": "Lincoln"
                },
                {
                    "rawValue": "8,959",
                    "value": "8,959"
                },
                {
                    "rawValue": 35.487825,
                    "value": "35.487825"
                },
                {
                    "rawValue": "–81.225176",
                    "value": "–81.225176"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orangeburg",
                    "value": "Orangeburg"
                },
                {
                    "rawValue": "8,948",
                    "value": "8,948"
                },
                {
                    "rawValue": 33.436135,
                    "value": "33.436135"
                },
                {
                    "rawValue": "–80.802913",
                    "value": "–80.802913"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "8,911",
                    "value": "8,911"
                },
                {
                    "rawValue": 43.013807,
                    "value": "43.013807"
                },
                {
                    "rawValue": "–88.773986",
                    "value": "–88.773986"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hampton city",
                    "value": "Hampton city"
                },
                {
                    "rawValue": "8,902",
                    "value": "8,902"
                },
                {
                    "rawValue": 37.04803,
                    "value": "37.04803"
                },
                {
                    "rawValue": "–76.297149",
                    "value": "–76.297149"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chaves",
                    "value": "Chaves"
                },
                {
                    "rawValue": "8,901",
                    "value": "8,901"
                },
                {
                    "rawValue": 33.361605,
                    "value": "33.361605"
                },
                {
                    "rawValue": "–104.469837",
                    "value": "–104.469837"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sherburne",
                    "value": "Sherburne"
                },
                {
                    "rawValue": "8,866",
                    "value": "8,866"
                },
                {
                    "rawValue": 45.443171,
                    "value": "45.443171"
                },
                {
                    "rawValue": "–93.775092",
                    "value": "–93.775092"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lea",
                    "value": "Lea"
                },
                {
                    "rawValue": "8,842",
                    "value": "8,842"
                },
                {
                    "rawValue": 32.795687,
                    "value": "32.795687"
                },
                {
                    "rawValue": "–103.413271",
                    "value": "–103.413271"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "8,784",
                    "value": "8,784"
                },
                {
                    "rawValue": 37.723528,
                    "value": "37.723528"
                },
                {
                    "rawValue": "–84.277008",
                    "value": "–84.277008"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Caldwell",
                    "value": "Caldwell"
                },
                {
                    "rawValue": "8,745",
                    "value": "8,745"
                },
                {
                    "rawValue": 35.957857000000004,
                    "value": "35.957857000000004"
                },
                {
                    "rawValue": "–81.530076",
                    "value": "–81.530076"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Douglas",
                    "value": "Douglas"
                },
                {
                    "rawValue": "8,735",
                    "value": "8,735"
                },
                {
                    "rawValue": 38.896573,
                    "value": "38.896573"
                },
                {
                    "rawValue": "–95.290529",
                    "value": "–95.290529"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cass",
                    "value": "Cass"
                },
                {
                    "rawValue": "8,731",
                    "value": "8,731"
                },
                {
                    "rawValue": 38.647159,
                    "value": "38.647159"
                },
                {
                    "rawValue": "–94.354242",
                    "value": "–94.354242"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Francois",
                    "value": "St. Francois"
                },
                {
                    "rawValue": "8,688",
                    "value": "8,688"
                },
                {
                    "rawValue": 37.810707,
                    "value": "37.810707"
                },
                {
                    "rawValue": "–90.473868",
                    "value": "–90.473868"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Vermilion",
                    "value": "Vermilion"
                },
                {
                    "rawValue": "8,683",
                    "value": "8,683"
                },
                {
                    "rawValue": 40.18674,
                    "value": "40.18674"
                },
                {
                    "rawValue": "–87.726772",
                    "value": "–87.726772"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "8,672",
                    "value": "8,672"
                },
                {
                    "rawValue": 42.411782,
                    "value": "42.411782"
                },
                {
                    "rawValue": "–122.675797",
                    "value": "–122.675797"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Putnam",
                    "value": "Putnam"
                },
                {
                    "rawValue": "8,661",
                    "value": "8,661"
                },
                {
                    "rawValue": 41.427904,
                    "value": "41.427904"
                },
                {
                    "rawValue": "–73.743882",
                    "value": "–73.743882"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "8,657",
                    "value": "8,657"
                },
                {
                    "rawValue": 34.277696,
                    "value": "34.277696"
                },
                {
                    "rawValue": "–91.930701",
                    "value": "–91.930701"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lauderdale",
                    "value": "Lauderdale"
                },
                {
                    "rawValue": "8,651",
                    "value": "8,651"
                },
                {
                    "rawValue": 34.904121999999994,
                    "value": "34.904121999999994"
                },
                {
                    "rawValue": "–87.650997",
                    "value": "–87.650997"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kosciusko",
                    "value": "Kosciusko"
                },
                {
                    "rawValue": "8,642",
                    "value": "8,642"
                },
                {
                    "rawValue": 41.244293,
                    "value": "41.244293"
                },
                {
                    "rawValue": "–85.861575",
                    "value": "–85.861575"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wilson",
                    "value": "Wilson"
                },
                {
                    "rawValue": "8,624",
                    "value": "8,624"
                },
                {
                    "rawValue": 35.704125,
                    "value": "35.704125"
                },
                {
                    "rawValue": "–77.918982",
                    "value": "–77.918982"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oconee",
                    "value": "Oconee"
                },
                {
                    "rawValue": "8,605",
                    "value": "8,605"
                },
                {
                    "rawValue": 34.748759,
                    "value": "34.748759"
                },
                {
                    "rawValue": "–83.061522",
                    "value": "–83.061522"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ozaukee",
                    "value": "Ozaukee"
                },
                {
                    "rawValue": "8,603",
                    "value": "8,603"
                },
                {
                    "rawValue": 43.360715,
                    "value": "43.360715"
                },
                {
                    "rawValue": "–87.496553",
                    "value": "–87.496553"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "DeKalb",
                    "value": "DeKalb"
                },
                {
                    "rawValue": "8,572",
                    "value": "8,572"
                },
                {
                    "rawValue": 41.894613,
                    "value": "41.894613"
                },
                {
                    "rawValue": "–88.768991",
                    "value": "–88.768991"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bastrop",
                    "value": "Bastrop"
                },
                {
                    "rawValue": "8,565",
                    "value": "8,565"
                },
                {
                    "rawValue": 30.103128,
                    "value": "30.103128"
                },
                {
                    "rawValue": "–97.311859",
                    "value": "–97.311859"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "DeKalb",
                    "value": "DeKalb"
                },
                {
                    "rawValue": "8,538",
                    "value": "8,538"
                },
                {
                    "rawValue": 34.460929,
                    "value": "34.460929"
                },
                {
                    "rawValue": "–85.803992",
                    "value": "–85.803992"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Christian",
                    "value": "Christian"
                },
                {
                    "rawValue": "8,515",
                    "value": "8,515"
                },
                {
                    "rawValue": 36.969739000000004,
                    "value": "36.969739000000004"
                },
                {
                    "rawValue": "–93.187614",
                    "value": "–93.187614"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Spotsylvania",
                    "value": "Spotsylvania"
                },
                {
                    "rawValue": "8,502",
                    "value": "8,502"
                },
                {
                    "rawValue": 38.182311,
                    "value": "38.182311"
                },
                {
                    "rawValue": "–77.656280",
                    "value": "–77.656280"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Craven",
                    "value": "Craven"
                },
                {
                    "rawValue": "8,480",
                    "value": "8,480"
                },
                {
                    "rawValue": 35.118179,
                    "value": "35.118179"
                },
                {
                    "rawValue": "–77.082541",
                    "value": "–77.082541"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walker",
                    "value": "Walker"
                },
                {
                    "rawValue": "8,463",
                    "value": "8,463"
                },
                {
                    "rawValue": 30.743090000000002,
                    "value": "30.743090000000002"
                },
                {
                    "rawValue": "–95.569888",
                    "value": "–95.569888"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Payne",
                    "value": "Payne"
                },
                {
                    "rawValue": "8,461",
                    "value": "8,461"
                },
                {
                    "rawValue": 36.079225,
                    "value": "36.079225"
                },
                {
                    "rawValue": "–96.975255",
                    "value": "–96.975255"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Manitowoc",
                    "value": "Manitowoc"
                },
                {
                    "rawValue": "8,419",
                    "value": "8,419"
                },
                {
                    "rawValue": 44.105108,
                    "value": "44.105108"
                },
                {
                    "rawValue": "–87.313828",
                    "value": "–87.313828"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Landry",
                    "value": "St. Landry"
                },
                {
                    "rawValue": "8,375",
                    "value": "8,375"
                },
                {
                    "rawValue": 30.583440999999997,
                    "value": "30.583440999999997"
                },
                {
                    "rawValue": "–91.989275",
                    "value": "–91.989275"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Missoula",
                    "value": "Missoula"
                },
                {
                    "rawValue": "8,340",
                    "value": "8,340"
                },
                {
                    "rawValue": 47.027263,
                    "value": "47.027263"
                },
                {
                    "rawValue": "–113.892681",
                    "value": "–113.892681"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Reno",
                    "value": "Reno"
                },
                {
                    "rawValue": "8,320",
                    "value": "8,320"
                },
                {
                    "rawValue": 37.948184999999995,
                    "value": "37.948184999999995"
                },
                {
                    "rawValue": "–98.078346",
                    "value": "–98.078346"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Laramie",
                    "value": "Laramie"
                },
                {
                    "rawValue": "8,314",
                    "value": "8,314"
                },
                {
                    "rawValue": 41.29283,
                    "value": "41.29283"
                },
                {
                    "rawValue": "–104.660395",
                    "value": "–104.660395"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mercer",
                    "value": "Mercer"
                },
                {
                    "rawValue": "8,297",
                    "value": "8,297"
                },
                {
                    "rawValue": 41.300014000000004,
                    "value": "41.300014000000004"
                },
                {
                    "rawValue": "–80.252786",
                    "value": "–80.252786"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Muskingum",
                    "value": "Muskingum"
                },
                {
                    "rawValue": "8,280",
                    "value": "8,280"
                },
                {
                    "rawValue": 39.966046,
                    "value": "39.966046"
                },
                {
                    "rawValue": "–81.943506",
                    "value": "–81.943506"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fayette",
                    "value": "Fayette"
                },
                {
                    "rawValue": "8,263",
                    "value": "8,263"
                },
                {
                    "rawValue": 33.412717,
                    "value": "33.412717"
                },
                {
                    "rawValue": "–84.493941",
                    "value": "–84.493941"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Campbell",
                    "value": "Campbell"
                },
                {
                    "rawValue": "8,255",
                    "value": "8,255"
                },
                {
                    "rawValue": 38.946981,
                    "value": "38.946981"
                },
                {
                    "rawValue": "–84.379583",
                    "value": "–84.379583"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sumter",
                    "value": "Sumter"
                },
                {
                    "rawValue": "8,247",
                    "value": "8,247"
                },
                {
                    "rawValue": 28.714294,
                    "value": "28.714294"
                },
                {
                    "rawValue": "–82.074715",
                    "value": "–82.074715"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monongalia",
                    "value": "Monongalia"
                },
                {
                    "rawValue": "8,227",
                    "value": "8,227"
                },
                {
                    "rawValue": 39.633645,
                    "value": "39.633645"
                },
                {
                    "rawValue": "–80.059074",
                    "value": "–80.059074"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Columbiana",
                    "value": "Columbiana"
                },
                {
                    "rawValue": "8,208",
                    "value": "8,208"
                },
                {
                    "rawValue": 40.768462,
                    "value": "40.768462"
                },
                {
                    "rawValue": "–80.777231",
                    "value": "–80.777231"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Brunswick",
                    "value": "Brunswick"
                },
                {
                    "rawValue": "8,197",
                    "value": "8,197"
                },
                {
                    "rawValue": 34.038708,
                    "value": "34.038708"
                },
                {
                    "rawValue": "–78.227688",
                    "value": "–78.227688"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Anderson",
                    "value": "Anderson"
                },
                {
                    "rawValue": "8,155",
                    "value": "8,155"
                },
                {
                    "rawValue": 36.116731,
                    "value": "36.116731"
                },
                {
                    "rawValue": "–84.195418",
                    "value": "–84.195418"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montgomery",
                    "value": "Montgomery"
                },
                {
                    "rawValue": "8,145",
                    "value": "8,145"
                },
                {
                    "rawValue": 37.174884999999996,
                    "value": "37.174884999999996"
                },
                {
                    "rawValue": "–80.387314",
                    "value": "–80.387314"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "8,141",
                    "value": "8,141"
                },
                {
                    "rawValue": 41.401162,
                    "value": "41.401162"
                },
                {
                    "rawValue": "–71.617612",
                    "value": "–71.617612"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Northumberland",
                    "value": "Northumberland"
                },
                {
                    "rawValue": "8,132",
                    "value": "8,132"
                },
                {
                    "rawValue": 40.851524,
                    "value": "40.851524"
                },
                {
                    "rawValue": "–76.709877",
                    "value": "–76.709877"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hamblen",
                    "value": "Hamblen"
                },
                {
                    "rawValue": "8,130",
                    "value": "8,130"
                },
                {
                    "rawValue": 36.218396999999996,
                    "value": "36.218396999999996"
                },
                {
                    "rawValue": "–83.266071",
                    "value": "–83.266071"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Moore",
                    "value": "Moore"
                },
                {
                    "rawValue": "8,128",
                    "value": "8,128"
                },
                {
                    "rawValue": 35.310163,
                    "value": "35.310163"
                },
                {
                    "rawValue": "–79.480664",
                    "value": "–79.480664"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pickaway",
                    "value": "Pickaway"
                },
                {
                    "rawValue": "8,118",
                    "value": "8,118"
                },
                {
                    "rawValue": 39.648947,
                    "value": "39.648947"
                },
                {
                    "rawValue": "–83.052827",
                    "value": "–83.052827"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tuscarawas",
                    "value": "Tuscarawas"
                },
                {
                    "rawValue": "8,118",
                    "value": "8,118"
                },
                {
                    "rawValue": 40.447441,
                    "value": "40.447441"
                },
                {
                    "rawValue": "–81.471157",
                    "value": "–81.471157"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Croix",
                    "value": "St. Croix"
                },
                {
                    "rawValue": "8,094",
                    "value": "8,094"
                },
                {
                    "rawValue": 45.028959,
                    "value": "45.028959"
                },
                {
                    "rawValue": "–92.447284",
                    "value": "–92.447284"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tolland",
                    "value": "Tolland"
                },
                {
                    "rawValue": "8,078",
                    "value": "8,078"
                },
                {
                    "rawValue": 41.858076000000004,
                    "value": "41.858076000000004"
                },
                {
                    "rawValue": "–72.340977",
                    "value": "–72.340977"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jones",
                    "value": "Jones"
                },
                {
                    "rawValue": "8,066",
                    "value": "8,066"
                },
                {
                    "rawValue": 31.621044,
                    "value": "31.621044"
                },
                {
                    "rawValue": "–89.167262",
                    "value": "–89.167262"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marion",
                    "value": "Marion"
                },
                {
                    "rawValue": "8,056",
                    "value": "8,056"
                },
                {
                    "rawValue": 40.588208,
                    "value": "40.588208"
                },
                {
                    "rawValue": "–83.172927",
                    "value": "–83.172927"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Adams",
                    "value": "Adams"
                },
                {
                    "rawValue": "8,048",
                    "value": "8,048"
                },
                {
                    "rawValue": 39.986053000000005,
                    "value": "39.986053000000005"
                },
                {
                    "rawValue": "–91.194961",
                    "value": "–91.194961"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Angelina",
                    "value": "Angelina"
                },
                {
                    "rawValue": "8,036",
                    "value": "8,036"
                },
                {
                    "rawValue": 31.251951000000002,
                    "value": "31.251951000000002"
                },
                {
                    "rawValue": "–94.611056",
                    "value": "–94.611056"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bannock",
                    "value": "Bannock"
                },
                {
                    "rawValue": "8,034",
                    "value": "8,034"
                },
                {
                    "rawValue": 42.692939,
                    "value": "42.692939"
                },
                {
                    "rawValue": "–112.228986",
                    "value": "–112.228986"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pottawatomie",
                    "value": "Pottawatomie"
                },
                {
                    "rawValue": "8,001",
                    "value": "8,001"
                },
                {
                    "rawValue": 35.211393,
                    "value": "35.211393"
                },
                {
                    "rawValue": "–96.957007",
                    "value": "–96.957007"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carver",
                    "value": "Carver"
                },
                {
                    "rawValue": "7,999",
                    "value": "7,999"
                },
                {
                    "rawValue": 44.821381,
                    "value": "44.821381"
                },
                {
                    "rawValue": "–93.800575",
                    "value": "–93.800575"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cabell",
                    "value": "Cabell"
                },
                {
                    "rawValue": "7,987",
                    "value": "7,987"
                },
                {
                    "rawValue": 38.419579999999996,
                    "value": "38.419579999999996"
                },
                {
                    "rawValue": "–82.243392",
                    "value": "–82.243392"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wayne",
                    "value": "Wayne"
                },
                {
                    "rawValue": "7,985",
                    "value": "7,985"
                },
                {
                    "rawValue": 40.829661,
                    "value": "40.829661"
                },
                {
                    "rawValue": "–81.887194",
                    "value": "–81.887194"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Victoria",
                    "value": "Victoria"
                },
                {
                    "rawValue": "7,981",
                    "value": "7,981"
                },
                {
                    "rawValue": 28.79637,
                    "value": "28.79637"
                },
                {
                    "rawValue": "–96.971198",
                    "value": "–96.971198"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carolina",
                    "value": "Carolina"
                },
                {
                    "rawValue": "7,960",
                    "value": "7,960"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Darlington",
                    "value": "Darlington"
                },
                {
                    "rawValue": "7,929",
                    "value": "7,929"
                },
                {
                    "rawValue": 34.332184999999996,
                    "value": "34.332184999999996"
                },
                {
                    "rawValue": "–79.962116",
                    "value": "–79.962116"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lenawee",
                    "value": "Lenawee"
                },
                {
                    "rawValue": "7,916",
                    "value": "7,916"
                },
                {
                    "rawValue": 41.895915,
                    "value": "41.895915"
                },
                {
                    "rawValue": "–84.066853",
                    "value": "–84.066853"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Portsmouth city",
                    "value": "Portsmouth city"
                },
                {
                    "rawValue": "7,896",
                    "value": "7,896"
                },
                {
                    "rawValue": 36.859429999999996,
                    "value": "36.859429999999996"
                },
                {
                    "rawValue": "–76.356269",
                    "value": "–76.356269"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lincoln",
                    "value": "Lincoln"
                },
                {
                    "rawValue": "7,894",
                    "value": "7,894"
                },
                {
                    "rawValue": 43.27942,
                    "value": "43.27942"
                },
                {
                    "rawValue": "–96.722286",
                    "value": "–96.722286"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orange",
                    "value": "Orange"
                },
                {
                    "rawValue": "7,847",
                    "value": "7,847"
                },
                {
                    "rawValue": 36.062499,
                    "value": "36.062499"
                },
                {
                    "rawValue": "–79.119355",
                    "value": "–79.119355"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Nassau",
                    "value": "Nassau"
                },
                {
                    "rawValue": "7,821",
                    "value": "7,821"
                },
                {
                    "rawValue": 30.605926,
                    "value": "30.605926"
                },
                {
                    "rawValue": "–81.764929",
                    "value": "–81.764929"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pope",
                    "value": "Pope"
                },
                {
                    "rawValue": "7,790",
                    "value": "7,790"
                },
                {
                    "rawValue": 35.455296999999995,
                    "value": "35.455296999999995"
                },
                {
                    "rawValue": "–93.031535",
                    "value": "–93.031535"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wagoner",
                    "value": "Wagoner"
                },
                {
                    "rawValue": "7,769",
                    "value": "7,769"
                },
                {
                    "rawValue": 35.963479,
                    "value": "35.963479"
                },
                {
                    "rawValue": "–95.514100",
                    "value": "–95.514100"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cascade",
                    "value": "Cascade"
                },
                {
                    "rawValue": "7,767",
                    "value": "7,767"
                },
                {
                    "rawValue": 47.316443,
                    "value": "47.316443"
                },
                {
                    "rawValue": "–111.350571",
                    "value": "–111.350571"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gordon",
                    "value": "Gordon"
                },
                {
                    "rawValue": "7,759",
                    "value": "7,759"
                },
                {
                    "rawValue": 34.509667,
                    "value": "34.509667"
                },
                {
                    "rawValue": "–84.873862",
                    "value": "–84.873862"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Natrona",
                    "value": "Natrona"
                },
                {
                    "rawValue": "7,754",
                    "value": "7,754"
                },
                {
                    "rawValue": 42.973641,
                    "value": "42.973641"
                },
                {
                    "rawValue": "–106.764877",
                    "value": "–106.764877"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Val Verde",
                    "value": "Val Verde"
                },
                {
                    "rawValue": "7,736",
                    "value": "7,736"
                },
                {
                    "rawValue": 29.884960999999997,
                    "value": "29.884960999999997"
                },
                {
                    "rawValue": "–101.146646",
                    "value": "–101.146646"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Columbia",
                    "value": "Columbia"
                },
                {
                    "rawValue": "7,733",
                    "value": "7,733"
                },
                {
                    "rawValue": 30.221304999999997,
                    "value": "30.221304999999997"
                },
                {
                    "rawValue": "–82.623127",
                    "value": "–82.623127"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Umatilla",
                    "value": "Umatilla"
                },
                {
                    "rawValue": "7,732",
                    "value": "7,732"
                },
                {
                    "rawValue": 45.5912,
                    "value": "45.5912"
                },
                {
                    "rawValue": "–118.733880",
                    "value": "–118.733880"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Glynn",
                    "value": "Glynn"
                },
                {
                    "rawValue": "7,727",
                    "value": "7,727"
                },
                {
                    "rawValue": 31.212746999999997,
                    "value": "31.212746999999997"
                },
                {
                    "rawValue": "–81.496517",
                    "value": "–81.496517"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carroll",
                    "value": "Carroll"
                },
                {
                    "rawValue": "7,722",
                    "value": "7,722"
                },
                {
                    "rawValue": 39.563189,
                    "value": "39.563189"
                },
                {
                    "rawValue": "–77.015512",
                    "value": "–77.015512"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hampshire",
                    "value": "Hampshire"
                },
                {
                    "rawValue": "7,715",
                    "value": "7,715"
                },
                {
                    "rawValue": 42.339459000000005,
                    "value": "42.339459000000005"
                },
                {
                    "rawValue": "–72.663694",
                    "value": "–72.663694"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Orange",
                    "value": "Orange"
                },
                {
                    "rawValue": "7,707",
                    "value": "7,707"
                },
                {
                    "rawValue": 30.120918,
                    "value": "30.120918"
                },
                {
                    "rawValue": "–93.893358",
                    "value": "–93.893358"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Roanoke city",
                    "value": "Roanoke city"
                },
                {
                    "rawValue": "7,697",
                    "value": "7,697"
                },
                {
                    "rawValue": 37.27783,
                    "value": "37.27783"
                },
                {
                    "rawValue": "–79.958472",
                    "value": "–79.958472"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Talladega",
                    "value": "Talladega"
                },
                {
                    "rawValue": "7,670",
                    "value": "7,670"
                },
                {
                    "rawValue": 33.369277000000004,
                    "value": "33.369277000000004"
                },
                {
                    "rawValue": "–86.175805",
                    "value": "–86.175805"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Santa Cruz",
                    "value": "Santa Cruz"
                },
                {
                    "rawValue": "7,664",
                    "value": "7,664"
                },
                {
                    "rawValue": 31.525903999999997,
                    "value": "31.525903999999997"
                },
                {
                    "rawValue": "–110.845190",
                    "value": "–110.845190"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "White",
                    "value": "White"
                },
                {
                    "rawValue": "7,653",
                    "value": "7,653"
                },
                {
                    "rawValue": 35.254721999999994,
                    "value": "35.254721999999994"
                },
                {
                    "rawValue": "–91.753158",
                    "value": "–91.753158"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Merrimack",
                    "value": "Merrimack"
                },
                {
                    "rawValue": "7,634",
                    "value": "7,634"
                },
                {
                    "rawValue": 43.299485,
                    "value": "43.299485"
                },
                {
                    "rawValue": "–71.680130",
                    "value": "–71.680130"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Garfield",
                    "value": "Garfield"
                },
                {
                    "rawValue": "7,633",
                    "value": "7,633"
                },
                {
                    "rawValue": 36.378273,
                    "value": "36.378273"
                },
                {
                    "rawValue": "–97.787729",
                    "value": "–97.787729"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bay",
                    "value": "Bay"
                },
                {
                    "rawValue": "7,617",
                    "value": "7,617"
                },
                {
                    "rawValue": 43.699711,
                    "value": "43.699711"
                },
                {
                    "rawValue": "–83.978701",
                    "value": "–83.978701"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bartholomew",
                    "value": "Bartholomew"
                },
                {
                    "rawValue": "7,572",
                    "value": "7,572"
                },
                {
                    "rawValue": 39.205843,
                    "value": "39.205843"
                },
                {
                    "rawValue": "–85.897999",
                    "value": "–85.897999"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cape May",
                    "value": "Cape May"
                },
                {
                    "rawValue": "7,512",
                    "value": "7,512"
                },
                {
                    "rawValue": 39.086143,
                    "value": "39.086143"
                },
                {
                    "rawValue": "–74.847716",
                    "value": "–74.847716"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hancock",
                    "value": "Hancock"
                },
                {
                    "rawValue": "7,511",
                    "value": "7,511"
                },
                {
                    "rawValue": 39.822604,
                    "value": "39.822604"
                },
                {
                    "rawValue": "–85.772904",
                    "value": "–85.772904"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Adams",
                    "value": "Adams"
                },
                {
                    "rawValue": "7,502",
                    "value": "7,502"
                },
                {
                    "rawValue": 39.869471000000004,
                    "value": "39.869471000000004"
                },
                {
                    "rawValue": "–77.217730",
                    "value": "–77.217730"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chautauqua",
                    "value": "Chautauqua"
                },
                {
                    "rawValue": "7,486",
                    "value": "7,486"
                },
                {
                    "rawValue": 42.304216,
                    "value": "42.304216"
                },
                {
                    "rawValue": "–79.407595",
                    "value": "–79.407595"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Roanoke",
                    "value": "Roanoke"
                },
                {
                    "rawValue": "7,483",
                    "value": "7,483"
                },
                {
                    "rawValue": 37.331077,
                    "value": "37.331077"
                },
                {
                    "rawValue": "–80.190110",
                    "value": "–80.190110"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Allegan",
                    "value": "Allegan"
                },
                {
                    "rawValue": "7,472",
                    "value": "7,472"
                },
                {
                    "rawValue": 42.595788,
                    "value": "42.595788"
                },
                {
                    "rawValue": "–86.634745",
                    "value": "–86.634745"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Warrick",
                    "value": "Warrick"
                },
                {
                    "rawValue": "7,471",
                    "value": "7,471"
                },
                {
                    "rawValue": 38.097764,
                    "value": "38.097764"
                },
                {
                    "rawValue": "–87.272023",
                    "value": "–87.272023"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Surry",
                    "value": "Surry"
                },
                {
                    "rawValue": "7,461",
                    "value": "7,461"
                },
                {
                    "rawValue": 36.415416,
                    "value": "36.415416"
                },
                {
                    "rawValue": "–80.686463",
                    "value": "–80.686463"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Warren",
                    "value": "Warren"
                },
                {
                    "rawValue": "7,425",
                    "value": "7,425"
                },
                {
                    "rawValue": 40.853524,
                    "value": "40.853524"
                },
                {
                    "rawValue": "–75.009542",
                    "value": "–75.009542"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Thurston",
                    "value": "Thurston"
                },
                {
                    "rawValue": "7,407",
                    "value": "7,407"
                },
                {
                    "rawValue": 46.932598,
                    "value": "46.932598"
                },
                {
                    "rawValue": "–122.829441",
                    "value": "–122.829441"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Highlands",
                    "value": "Highlands"
                },
                {
                    "rawValue": "7,369",
                    "value": "7,369"
                },
                {
                    "rawValue": 27.342627,
                    "value": "27.342627"
                },
                {
                    "rawValue": "–81.340921",
                    "value": "–81.340921"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hall",
                    "value": "Hall"
                },
                {
                    "rawValue": "7,355",
                    "value": "7,355"
                },
                {
                    "rawValue": 40.866023,
                    "value": "40.866023"
                },
                {
                    "rawValue": "–98.498004",
                    "value": "–98.498004"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Greene",
                    "value": "Greene"
                },
                {
                    "rawValue": "7,336",
                    "value": "7,336"
                },
                {
                    "rawValue": 36.178998,
                    "value": "36.178998"
                },
                {
                    "rawValue": "–82.847746",
                    "value": "–82.847746"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Forrest",
                    "value": "Forrest"
                },
                {
                    "rawValue": "7,320",
                    "value": "7,320"
                },
                {
                    "rawValue": 31.188579999999998,
                    "value": "31.188579999999998"
                },
                {
                    "rawValue": "–89.259447",
                    "value": "–89.259447"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Floyd",
                    "value": "Floyd"
                },
                {
                    "rawValue": "7,285",
                    "value": "7,285"
                },
                {
                    "rawValue": 38.317937,
                    "value": "38.317937"
                },
                {
                    "rawValue": "–85.911474",
                    "value": "–85.911474"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hunterdon",
                    "value": "Hunterdon"
                },
                {
                    "rawValue": "7,275",
                    "value": "7,275"
                },
                {
                    "rawValue": 40.565283,
                    "value": "40.565283"
                },
                {
                    "rawValue": "–74.911970",
                    "value": "–74.911970"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chippewa",
                    "value": "Chippewa"
                },
                {
                    "rawValue": "7,275",
                    "value": "7,275"
                },
                {
                    "rawValue": 45.069092,
                    "value": "45.069092"
                },
                {
                    "rawValue": "–91.283505",
                    "value": "–91.283505"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Butler",
                    "value": "Butler"
                },
                {
                    "rawValue": "7,255",
                    "value": "7,255"
                },
                {
                    "rawValue": 37.773680999999996,
                    "value": "37.773680999999996"
                },
                {
                    "rawValue": "–96.838762",
                    "value": "–96.838762"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Strafford",
                    "value": "Strafford"
                },
                {
                    "rawValue": "7,255",
                    "value": "7,255"
                },
                {
                    "rawValue": 43.293177,
                    "value": "43.293177"
                },
                {
                    "rawValue": "–71.035927",
                    "value": "–71.035927"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Greenwood",
                    "value": "Greenwood"
                },
                {
                    "rawValue": "7,253",
                    "value": "7,253"
                },
                {
                    "rawValue": 34.155796,
                    "value": "34.155796"
                },
                {
                    "rawValue": "–82.127876",
                    "value": "–82.127876"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wood",
                    "value": "Wood"
                },
                {
                    "rawValue": "7,194",
                    "value": "7,194"
                },
                {
                    "rawValue": 39.211679,
                    "value": "39.211679"
                },
                {
                    "rawValue": "–81.515928",
                    "value": "–81.515928"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wood",
                    "value": "Wood"
                },
                {
                    "rawValue": "7,179",
                    "value": "7,179"
                },
                {
                    "rawValue": 44.461413,
                    "value": "44.461413"
                },
                {
                    "rawValue": "–90.038825",
                    "value": "–90.038825"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Liberty",
                    "value": "Liberty"
                },
                {
                    "rawValue": "7,170",
                    "value": "7,170"
                },
                {
                    "rawValue": 30.162189,
                    "value": "30.162189"
                },
                {
                    "rawValue": "–94.822682",
                    "value": "–94.822682"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ionia",
                    "value": "Ionia"
                },
                {
                    "rawValue": "7,169",
                    "value": "7,169"
                },
                {
                    "rawValue": 42.94465,
                    "value": "42.94465"
                },
                {
                    "rawValue": "–85.073766",
                    "value": "–85.073766"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walton",
                    "value": "Walton"
                },
                {
                    "rawValue": "7,166",
                    "value": "7,166"
                },
                {
                    "rawValue": 30.631210999999997,
                    "value": "30.631210999999997"
                },
                {
                    "rawValue": "–86.176614",
                    "value": "–86.176614"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dougherty",
                    "value": "Dougherty"
                },
                {
                    "rawValue": "7,147",
                    "value": "7,147"
                },
                {
                    "rawValue": 31.535068,
                    "value": "31.535068"
                },
                {
                    "rawValue": "–84.214444",
                    "value": "–84.214444"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Troup",
                    "value": "Troup"
                },
                {
                    "rawValue": "7,100",
                    "value": "7,100"
                },
                {
                    "rawValue": 33.034482000000004,
                    "value": "33.034482000000004"
                },
                {
                    "rawValue": "–85.028360",
                    "value": "–85.028360"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oldham",
                    "value": "Oldham"
                },
                {
                    "rawValue": "7,072",
                    "value": "7,072"
                },
                {
                    "rawValue": 38.400046,
                    "value": "38.400046"
                },
                {
                    "rawValue": "–85.456059",
                    "value": "–85.456059"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wayne",
                    "value": "Wayne"
                },
                {
                    "rawValue": "7,061",
                    "value": "7,061"
                },
                {
                    "rawValue": 39.863091,
                    "value": "39.863091"
                },
                {
                    "rawValue": "–85.006735",
                    "value": "–85.006735"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Suffolk city",
                    "value": "Suffolk city"
                },
                {
                    "rawValue": "7,053",
                    "value": "7,053"
                },
                {
                    "rawValue": 36.697157000000004,
                    "value": "36.697157000000004"
                },
                {
                    "rawValue": "–76.634781",
                    "value": "–76.634781"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Whatcom",
                    "value": "Whatcom"
                },
                {
                    "rawValue": "7,044",
                    "value": "7,044"
                },
                {
                    "rawValue": 48.842653000000006,
                    "value": "48.842653000000006"
                },
                {
                    "rawValue": "–121.836433",
                    "value": "–121.836433"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Portage",
                    "value": "Portage"
                },
                {
                    "rawValue": "7,040",
                    "value": "7,040"
                },
                {
                    "rawValue": 44.476246,
                    "value": "44.476246"
                },
                {
                    "rawValue": "–89.498070",
                    "value": "–89.498070"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wise",
                    "value": "Wise"
                },
                {
                    "rawValue": "7,033",
                    "value": "7,033"
                },
                {
                    "rawValue": 33.219095,
                    "value": "33.219095"
                },
                {
                    "rawValue": "–97.653997",
                    "value": "–97.653997"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Erie",
                    "value": "Erie"
                },
                {
                    "rawValue": "7,002",
                    "value": "7,002"
                },
                {
                    "rawValue": 41.554006,
                    "value": "41.554006"
                },
                {
                    "rawValue": "–82.525897",
                    "value": "–82.525897"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tipton",
                    "value": "Tipton"
                },
                {
                    "rawValue": "7,002",
                    "value": "7,002"
                },
                {
                    "rawValue": 35.500296999999996,
                    "value": "35.500296999999996"
                },
                {
                    "rawValue": "–89.763708",
                    "value": "–89.763708"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clay",
                    "value": "Clay"
                },
                {
                    "rawValue": "6,995",
                    "value": "6,995"
                },
                {
                    "rawValue": 46.898377,
                    "value": "46.898377"
                },
                {
                    "rawValue": "–96.494901",
                    "value": "–96.494901"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sampson",
                    "value": "Sampson"
                },
                {
                    "rawValue": "6,990",
                    "value": "6,990"
                },
                {
                    "rawValue": 34.990575,
                    "value": "34.990575"
                },
                {
                    "rawValue": "–78.371382",
                    "value": "–78.371382"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stanly",
                    "value": "Stanly"
                },
                {
                    "rawValue": "6,964",
                    "value": "6,964"
                },
                {
                    "rawValue": 35.310522999999996,
                    "value": "35.310522999999996"
                },
                {
                    "rawValue": "–80.254355",
                    "value": "–80.254355"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lynchburg city",
                    "value": "Lynchburg city"
                },
                {
                    "rawValue": "6,952",
                    "value": "6,952"
                },
                {
                    "rawValue": 37.399015999999996,
                    "value": "37.399015999999996"
                },
                {
                    "rawValue": "–79.195458",
                    "value": "–79.195458"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coryell",
                    "value": "Coryell"
                },
                {
                    "rawValue": "6,933",
                    "value": "6,933"
                },
                {
                    "rawValue": 31.391177000000003,
                    "value": "31.391177000000003"
                },
                {
                    "rawValue": "–97.798022",
                    "value": "–97.798022"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rockingham",
                    "value": "Rockingham"
                },
                {
                    "rawValue": "6,922",
                    "value": "6,922"
                },
                {
                    "rawValue": 36.380927,
                    "value": "36.380927"
                },
                {
                    "rawValue": "–79.782889",
                    "value": "–79.782889"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lonoke",
                    "value": "Lonoke"
                },
                {
                    "rawValue": "6,920",
                    "value": "6,920"
                },
                {
                    "rawValue": 34.755114,
                    "value": "34.755114"
                },
                {
                    "rawValue": "–91.894132",
                    "value": "–91.894132"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rockdale",
                    "value": "Rockdale"
                },
                {
                    "rawValue": "6,913",
                    "value": "6,913"
                },
                {
                    "rawValue": 33.652081,
                    "value": "33.652081"
                },
                {
                    "rawValue": "–84.026370",
                    "value": "–84.026370"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lauderdale",
                    "value": "Lauderdale"
                },
                {
                    "rawValue": "6,903",
                    "value": "6,903"
                },
                {
                    "rawValue": 32.403998,
                    "value": "32.403998"
                },
                {
                    "rawValue": "–88.660449",
                    "value": "–88.660449"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grant",
                    "value": "Grant"
                },
                {
                    "rawValue": "6,897",
                    "value": "6,897"
                },
                {
                    "rawValue": 40.515758,
                    "value": "40.515758"
                },
                {
                    "rawValue": "–85.654946",
                    "value": "–85.654946"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Williamson",
                    "value": "Williamson"
                },
                {
                    "rawValue": "6,896",
                    "value": "6,896"
                },
                {
                    "rawValue": 37.730353,
                    "value": "37.730353"
                },
                {
                    "rawValue": "–88.930018",
                    "value": "–88.930018"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Leavenworth",
                    "value": "Leavenworth"
                },
                {
                    "rawValue": "6,895",
                    "value": "6,895"
                },
                {
                    "rawValue": 39.189510999999996,
                    "value": "39.189510999999996"
                },
                {
                    "rawValue": "–95.038977",
                    "value": "–95.038977"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Frederick",
                    "value": "Frederick"
                },
                {
                    "rawValue": "6,878",
                    "value": "6,878"
                },
                {
                    "rawValue": 39.203637,
                    "value": "39.203637"
                },
                {
                    "rawValue": "–78.263916",
                    "value": "–78.263916"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Crawford",
                    "value": "Crawford"
                },
                {
                    "rawValue": "6,870",
                    "value": "6,870"
                },
                {
                    "rawValue": 35.583040999999994,
                    "value": "35.583040999999994"
                },
                {
                    "rawValue": "–94.236224",
                    "value": "–94.236224"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hanover",
                    "value": "Hanover"
                },
                {
                    "rawValue": "6,854",
                    "value": "6,854"
                },
                {
                    "rawValue": 37.760166,
                    "value": "37.760166"
                },
                {
                    "rawValue": "–77.490992",
                    "value": "–77.490992"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wicomico",
                    "value": "Wicomico"
                },
                {
                    "rawValue": "6,845",
                    "value": "6,845"
                },
                {
                    "rawValue": 38.367389,
                    "value": "38.367389"
                },
                {
                    "rawValue": "–75.632206",
                    "value": "–75.632206"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walker",
                    "value": "Walker"
                },
                {
                    "rawValue": "6,844",
                    "value": "6,844"
                },
                {
                    "rawValue": 34.735827,
                    "value": "34.735827"
                },
                {
                    "rawValue": "–85.305385",
                    "value": "–85.305385"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rice",
                    "value": "Rice"
                },
                {
                    "rawValue": "6,828",
                    "value": "6,828"
                },
                {
                    "rawValue": 44.350943,
                    "value": "44.350943"
                },
                {
                    "rawValue": "–93.298503",
                    "value": "–93.298503"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rutherford",
                    "value": "Rutherford"
                },
                {
                    "rawValue": "6,810",
                    "value": "6,810"
                },
                {
                    "rawValue": 35.402747,
                    "value": "35.402747"
                },
                {
                    "rawValue": "–81.919583",
                    "value": "–81.919583"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kershaw",
                    "value": "Kershaw"
                },
                {
                    "rawValue": "6,809",
                    "value": "6,809"
                },
                {
                    "rawValue": 34.338356,
                    "value": "34.338356"
                },
                {
                    "rawValue": "–80.590885",
                    "value": "–80.590885"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Somerset",
                    "value": "Somerset"
                },
                {
                    "rawValue": "6,763",
                    "value": "6,763"
                },
                {
                    "rawValue": 39.981297,
                    "value": "39.981297"
                },
                {
                    "rawValue": "–79.028486",
                    "value": "–79.028486"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bowie",
                    "value": "Bowie"
                },
                {
                    "rawValue": "6,688",
                    "value": "6,688"
                },
                {
                    "rawValue": 33.446051000000004,
                    "value": "33.446051000000004"
                },
                {
                    "rawValue": "–94.422375",
                    "value": "–94.422375"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Creek",
                    "value": "Creek"
                },
                {
                    "rawValue": "6,666",
                    "value": "6,666"
                },
                {
                    "rawValue": 35.907732,
                    "value": "35.907732"
                },
                {
                    "rawValue": "–96.379793",
                    "value": "–96.379793"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tooele",
                    "value": "Tooele"
                },
                {
                    "rawValue": "6,643",
                    "value": "6,643"
                },
                {
                    "rawValue": 40.467692,
                    "value": "40.467692"
                },
                {
                    "rawValue": "–113.124015",
                    "value": "–113.124015"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walker",
                    "value": "Walker"
                },
                {
                    "rawValue": "6,636",
                    "value": "6,636"
                },
                {
                    "rawValue": 33.791571000000005,
                    "value": "33.791571000000005"
                },
                {
                    "rawValue": "–87.301092",
                    "value": "–87.301092"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bullitt",
                    "value": "Bullitt"
                },
                {
                    "rawValue": "6,563",
                    "value": "6,563"
                },
                {
                    "rawValue": 37.969572,
                    "value": "37.969572"
                },
                {
                    "rawValue": "–85.703036",
                    "value": "–85.703036"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "6,558",
                    "value": "6,558"
                },
                {
                    "rawValue": 34.763521999999995,
                    "value": "34.763521999999995"
                },
                {
                    "rawValue": "–85.977400",
                    "value": "–85.977400"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Iberia",
                    "value": "Iberia"
                },
                {
                    "rawValue": "6,557",
                    "value": "6,557"
                },
                {
                    "rawValue": 29.606013,
                    "value": "29.606013"
                },
                {
                    "rawValue": "–91.842706",
                    "value": "–91.842706"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bulloch",
                    "value": "Bulloch"
                },
                {
                    "rawValue": "6,548",
                    "value": "6,548"
                },
                {
                    "rawValue": 32.393408,
                    "value": "32.393408"
                },
                {
                    "rawValue": "–81.743810",
                    "value": "–81.743810"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Eddy",
                    "value": "Eddy"
                },
                {
                    "rawValue": "6,543",
                    "value": "6,543"
                },
                {
                    "rawValue": 32.457858,
                    "value": "32.457858"
                },
                {
                    "rawValue": "–104.306471",
                    "value": "–104.306471"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Valencia",
                    "value": "Valencia"
                },
                {
                    "rawValue": "6,530",
                    "value": "6,530"
                },
                {
                    "rawValue": 34.716840000000005,
                    "value": "34.716840000000005"
                },
                {
                    "rawValue": "–106.806582",
                    "value": "–106.806582"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clearfield",
                    "value": "Clearfield"
                },
                {
                    "rawValue": "6,523",
                    "value": "6,523"
                },
                {
                    "rawValue": 41.000249,
                    "value": "41.000249"
                },
                {
                    "rawValue": "–78.473749",
                    "value": "–78.473749"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Madison",
                    "value": "Madison"
                },
                {
                    "rawValue": "6,512",
                    "value": "6,512"
                },
                {
                    "rawValue": 43.789709,
                    "value": "43.789709"
                },
                {
                    "rawValue": "–111.656550",
                    "value": "–111.656550"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chemung",
                    "value": "Chemung"
                },
                {
                    "rawValue": "6,508",
                    "value": "6,508"
                },
                {
                    "rawValue": 42.155281,
                    "value": "42.155281"
                },
                {
                    "rawValue": "–76.747179",
                    "value": "–76.747179"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Crawford",
                    "value": "Crawford"
                },
                {
                    "rawValue": "6,481",
                    "value": "6,481"
                },
                {
                    "rawValue": 41.686840000000004,
                    "value": "41.686840000000004"
                },
                {
                    "rawValue": "–80.107811",
                    "value": "–80.107811"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coffee",
                    "value": "Coffee"
                },
                {
                    "rawValue": "6,477",
                    "value": "6,477"
                },
                {
                    "rawValue": 35.488759,
                    "value": "35.488759"
                },
                {
                    "rawValue": "–86.078219",
                    "value": "–86.078219"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Eaton",
                    "value": "Eaton"
                },
                {
                    "rawValue": "6,455",
                    "value": "6,455"
                },
                {
                    "rawValue": 42.589614000000005,
                    "value": "42.589614000000005"
                },
                {
                    "rawValue": "–84.846524",
                    "value": "–84.846524"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lewis and Clark",
                    "value": "Lewis and Clark"
                },
                {
                    "rawValue": "6,430",
                    "value": "6,430"
                },
                {
                    "rawValue": 47.122133000000005,
                    "value": "47.122133000000005"
                },
                {
                    "rawValue": "–112.382954",
                    "value": "–112.382954"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Allegany",
                    "value": "Allegany"
                },
                {
                    "rawValue": "6,427",
                    "value": "6,427"
                },
                {
                    "rawValue": 39.612309,
                    "value": "39.612309"
                },
                {
                    "rawValue": "–78.703108",
                    "value": "–78.703108"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gila",
                    "value": "Gila"
                },
                {
                    "rawValue": "6,424",
                    "value": "6,424"
                },
                {
                    "rawValue": 33.789618,
                    "value": "33.789618"
                },
                {
                    "rawValue": "–110.811870",
                    "value": "–110.811870"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Autauga",
                    "value": "Autauga"
                },
                {
                    "rawValue": "6,400",
                    "value": "6,400"
                },
                {
                    "rawValue": 32.536382,
                    "value": "32.536382"
                },
                {
                    "rawValue": "–86.644490",
                    "value": "–86.644490"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Laurens",
                    "value": "Laurens"
                },
                {
                    "rawValue": "6,400",
                    "value": "6,400"
                },
                {
                    "rawValue": 34.483477,
                    "value": "34.483477"
                },
                {
                    "rawValue": "–82.005657",
                    "value": "–82.005657"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dickson",
                    "value": "Dickson"
                },
                {
                    "rawValue": "6,337",
                    "value": "6,337"
                },
                {
                    "rawValue": 36.145533,
                    "value": "36.145533"
                },
                {
                    "rawValue": "–87.364155",
                    "value": "–87.364155"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fairbanks North Star Borough",
                    "value": "Fairbanks North Star Borough"
                },
                {
                    "rawValue": "6,317",
                    "value": "6,317"
                },
                {
                    "rawValue": 64.690832,
                    "value": "64.690832"
                },
                {
                    "rawValue": "–146.599867",
                    "value": "–146.599867"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Georgetown",
                    "value": "Georgetown"
                },
                {
                    "rawValue": "6,313",
                    "value": "6,313"
                },
                {
                    "rawValue": 33.41753,
                    "value": "33.41753"
                },
                {
                    "rawValue": "–79.300812",
                    "value": "–79.300812"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chelan",
                    "value": "Chelan"
                },
                {
                    "rawValue": "6,293",
                    "value": "6,293"
                },
                {
                    "rawValue": 47.859891999999995,
                    "value": "47.859891999999995"
                },
                {
                    "rawValue": "–120.618543",
                    "value": "–120.618543"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Christian",
                    "value": "Christian"
                },
                {
                    "rawValue": "6,278",
                    "value": "6,278"
                },
                {
                    "rawValue": 36.893388,
                    "value": "36.893388"
                },
                {
                    "rawValue": "–87.493554",
                    "value": "–87.493554"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hood",
                    "value": "Hood"
                },
                {
                    "rawValue": "6,267",
                    "value": "6,267"
                },
                {
                    "rawValue": 32.430149,
                    "value": "32.430149"
                },
                {
                    "rawValue": "–97.831677",
                    "value": "–97.831677"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Blount",
                    "value": "Blount"
                },
                {
                    "rawValue": "6,260",
                    "value": "6,260"
                },
                {
                    "rawValue": 33.977447999999995,
                    "value": "33.977447999999995"
                },
                {
                    "rawValue": "–86.567246",
                    "value": "–86.567246"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Riley",
                    "value": "Riley"
                },
                {
                    "rawValue": "6,243",
                    "value": "6,243"
                },
                {
                    "rawValue": 39.291211,
                    "value": "39.291211"
                },
                {
                    "rawValue": "–96.727489",
                    "value": "–96.727489"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Boone",
                    "value": "Boone"
                },
                {
                    "rawValue": "6,240",
                    "value": "6,240"
                },
                {
                    "rawValue": 40.050892,
                    "value": "40.050892"
                },
                {
                    "rawValue": "–86.469014",
                    "value": "–86.469014"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lawrence",
                    "value": "Lawrence"
                },
                {
                    "rawValue": "6,215",
                    "value": "6,215"
                },
                {
                    "rawValue": 40.992734999999996,
                    "value": "40.992734999999996"
                },
                {
                    "rawValue": "–80.334446",
                    "value": "–80.334446"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gibson",
                    "value": "Gibson"
                },
                {
                    "rawValue": "6,211",
                    "value": "6,211"
                },
                {
                    "rawValue": 35.991694,
                    "value": "35.991694"
                },
                {
                    "rawValue": "–88.933776",
                    "value": "–88.933776"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ross",
                    "value": "Ross"
                },
                {
                    "rawValue": "6,204",
                    "value": "6,204"
                },
                {
                    "rawValue": 39.323763,
                    "value": "39.323763"
                },
                {
                    "rawValue": "–83.059585",
                    "value": "–83.059585"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oswego",
                    "value": "Oswego"
                },
                {
                    "rawValue": "6,181",
                    "value": "6,181"
                },
                {
                    "rawValue": 43.461443,
                    "value": "43.461443"
                },
                {
                    "rawValue": "–76.209258",
                    "value": "–76.209258"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Flagler",
                    "value": "Flagler"
                },
                {
                    "rawValue": "6,180",
                    "value": "6,180"
                },
                {
                    "rawValue": 29.474894,
                    "value": "29.474894"
                },
                {
                    "rawValue": "–81.286362",
                    "value": "–81.286362"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Morgan",
                    "value": "Morgan"
                },
                {
                    "rawValue": "6,171",
                    "value": "6,171"
                },
                {
                    "rawValue": 39.482646,
                    "value": "39.482646"
                },
                {
                    "rawValue": "–86.447457",
                    "value": "–86.447457"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cumberland",
                    "value": "Cumberland"
                },
                {
                    "rawValue": "6,165",
                    "value": "6,165"
                },
                {
                    "rawValue": 35.952397999999995,
                    "value": "35.952397999999995"
                },
                {
                    "rawValue": "–84.994761",
                    "value": "–84.994761"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Acadia",
                    "value": "Acadia"
                },
                {
                    "rawValue": "6,154",
                    "value": "6,154"
                },
                {
                    "rawValue": 30.291496999999996,
                    "value": "30.291496999999996"
                },
                {
                    "rawValue": "–92.411037",
                    "value": "–92.411037"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Geauga",
                    "value": "Geauga"
                },
                {
                    "rawValue": "6,154",
                    "value": "6,154"
                },
                {
                    "rawValue": 41.499322,
                    "value": "41.499322"
                },
                {
                    "rawValue": "–81.173505",
                    "value": "–81.173505"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Rockingham",
                    "value": "Rockingham"
                },
                {
                    "rawValue": "6,141",
                    "value": "6,141"
                },
                {
                    "rawValue": 38.511257,
                    "value": "38.511257"
                },
                {
                    "rawValue": "–78.876307",
                    "value": "–78.876307"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Blue Earth",
                    "value": "Blue Earth"
                },
                {
                    "rawValue": "6,117",
                    "value": "6,117"
                },
                {
                    "rawValue": 44.038225,
                    "value": "44.038225"
                },
                {
                    "rawValue": "–94.064071",
                    "value": "–94.064071"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wilkes",
                    "value": "Wilkes"
                },
                {
                    "rawValue": "6,105",
                    "value": "6,105"
                },
                {
                    "rawValue": 36.209303000000006,
                    "value": "36.209303000000006"
                },
                {
                    "rawValue": "–81.165354",
                    "value": "–81.165354"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Anderson",
                    "value": "Anderson"
                },
                {
                    "rawValue": "6,077",
                    "value": "6,077"
                },
                {
                    "rawValue": 31.841265999999997,
                    "value": "31.841265999999997"
                },
                {
                    "rawValue": "–95.661744",
                    "value": "–95.661744"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Deschutes",
                    "value": "Deschutes"
                },
                {
                    "rawValue": "6,071",
                    "value": "6,071"
                },
                {
                    "rawValue": 43.915118,
                    "value": "43.915118"
                },
                {
                    "rawValue": "–121.225575",
                    "value": "–121.225575"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Calumet",
                    "value": "Calumet"
                },
                {
                    "rawValue": "6,069",
                    "value": "6,069"
                },
                {
                    "rawValue": 44.07841,
                    "value": "44.07841"
                },
                {
                    "rawValue": "–88.212132",
                    "value": "–88.212132"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lowndes",
                    "value": "Lowndes"
                },
                {
                    "rawValue": "6,068",
                    "value": "6,068"
                },
                {
                    "rawValue": 33.471424,
                    "value": "33.471424"
                },
                {
                    "rawValue": "–88.439723",
                    "value": "–88.439723"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hancock",
                    "value": "Hancock"
                },
                {
                    "rawValue": "6,060",
                    "value": "6,060"
                },
                {
                    "rawValue": 41.000471000000005,
                    "value": "41.000471000000005"
                },
                {
                    "rawValue": "–83.666034",
                    "value": "–83.666034"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hale",
                    "value": "Hale"
                },
                {
                    "rawValue": "6,058",
                    "value": "6,058"
                },
                {
                    "rawValue": 34.068436,
                    "value": "34.068436"
                },
                {
                    "rawValue": "–101.822888",
                    "value": "–101.822888"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "6,038",
                    "value": "6,038"
                },
                {
                    "rawValue": 25.601043,
                    "value": "25.601043"
                },
                {
                    "rawValue": "–81.206777",
                    "value": "–81.206777"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Scioto",
                    "value": "Scioto"
                },
                {
                    "rawValue": "6,032",
                    "value": "6,032"
                },
                {
                    "rawValue": 38.815019,
                    "value": "38.815019"
                },
                {
                    "rawValue": "–82.999028",
                    "value": "–82.999028"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Whiteside",
                    "value": "Whiteside"
                },
                {
                    "rawValue": "6,030",
                    "value": "6,030"
                },
                {
                    "rawValue": 41.750571,
                    "value": "41.750571"
                },
                {
                    "rawValue": "–89.910957",
                    "value": "–89.910957"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carter",
                    "value": "Carter"
                },
                {
                    "rawValue": "6,022",
                    "value": "6,022"
                },
                {
                    "rawValue": 36.284744,
                    "value": "36.284744"
                },
                {
                    "rawValue": "–82.126593",
                    "value": "–82.126593"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ashtabula",
                    "value": "Ashtabula"
                },
                {
                    "rawValue": "6,018",
                    "value": "6,018"
                },
                {
                    "rawValue": 41.906644,
                    "value": "41.906644"
                },
                {
                    "rawValue": "–80.745641",
                    "value": "–80.745641"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Saline",
                    "value": "Saline"
                },
                {
                    "rawValue": "6,011",
                    "value": "6,011"
                },
                {
                    "rawValue": 38.786327,
                    "value": "38.786327"
                },
                {
                    "rawValue": "–97.650153",
                    "value": "–97.650153"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Colbert",
                    "value": "Colbert"
                },
                {
                    "rawValue": "6,010",
                    "value": "6,010"
                },
                {
                    "rawValue": 34.703112,
                    "value": "34.703112"
                },
                {
                    "rawValue": "–87.801457",
                    "value": "–87.801457"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Laurel",
                    "value": "Laurel"
                },
                {
                    "rawValue": "6,009",
                    "value": "6,009"
                },
                {
                    "rawValue": 37.113268,
                    "value": "37.113268"
                },
                {
                    "rawValue": "–84.119395",
                    "value": "–84.119395"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McMinn",
                    "value": "McMinn"
                },
                {
                    "rawValue": "5,994",
                    "value": "5,994"
                },
                {
                    "rawValue": 35.424471000000004,
                    "value": "35.424471000000004"
                },
                {
                    "rawValue": "–84.619963",
                    "value": "–84.619963"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Finney",
                    "value": "Finney"
                },
                {
                    "rawValue": "5,993",
                    "value": "5,993"
                },
                {
                    "rawValue": 38.049855,
                    "value": "38.049855"
                },
                {
                    "rawValue": "–100.739929",
                    "value": "–100.739929"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bryan",
                    "value": "Bryan"
                },
                {
                    "rawValue": "5,991",
                    "value": "5,991"
                },
                {
                    "rawValue": 33.964003999999996,
                    "value": "33.964003999999996"
                },
                {
                    "rawValue": "–96.264137",
                    "value": "–96.264137"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "5,974",
                    "value": "5,974"
                },
                {
                    "rawValue": 30.787812,
                    "value": "30.787812"
                },
                {
                    "rawValue": "–85.210374",
                    "value": "–85.210374"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Roane",
                    "value": "Roane"
                },
                {
                    "rawValue": "5,967",
                    "value": "5,967"
                },
                {
                    "rawValue": 35.847471999999996,
                    "value": "35.847471999999996"
                },
                {
                    "rawValue": "–84.523861",
                    "value": "–84.523861"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Boone",
                    "value": "Boone"
                },
                {
                    "rawValue": "5,964",
                    "value": "5,964"
                },
                {
                    "rawValue": 42.318983,
                    "value": "42.318983"
                },
                {
                    "rawValue": "–88.824295",
                    "value": "–88.824295"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carson City",
                    "value": "Carson City"
                },
                {
                    "rawValue": "5,961",
                    "value": "5,961"
                },
                {
                    "rawValue": 39.153447,
                    "value": "39.153447"
                },
                {
                    "rawValue": "–119.743442",
                    "value": "–119.743442"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lamar",
                    "value": "Lamar"
                },
                {
                    "rawValue": "5,956",
                    "value": "5,956"
                },
                {
                    "rawValue": 31.197135,
                    "value": "31.197135"
                },
                {
                    "rawValue": "–89.514952",
                    "value": "–89.514952"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Columbus",
                    "value": "Columbus"
                },
                {
                    "rawValue": "5,954",
                    "value": "5,954"
                },
                {
                    "rawValue": 34.260471,
                    "value": "34.260471"
                },
                {
                    "rawValue": "–78.636378",
                    "value": "–78.636378"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dubois",
                    "value": "Dubois"
                },
                {
                    "rawValue": "5,952",
                    "value": "5,952"
                },
                {
                    "rawValue": 38.373344,
                    "value": "38.373344"
                },
                {
                    "rawValue": "–86.873385",
                    "value": "–86.873385"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ontario",
                    "value": "Ontario"
                },
                {
                    "rawValue": "5,950",
                    "value": "5,950"
                },
                {
                    "rawValue": 42.856695,
                    "value": "42.856695"
                },
                {
                    "rawValue": "–77.303277",
                    "value": "–77.303277"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Greene",
                    "value": "Greene"
                },
                {
                    "rawValue": "5,940",
                    "value": "5,940"
                },
                {
                    "rawValue": 36.119921999999995,
                    "value": "36.119921999999995"
                },
                {
                    "rawValue": "–90.565241",
                    "value": "–90.565241"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kitsap",
                    "value": "Kitsap"
                },
                {
                    "rawValue": "5,932",
                    "value": "5,932"
                },
                {
                    "rawValue": 47.639687,
                    "value": "47.639687"
                },
                {
                    "rawValue": "–122.649636",
                    "value": "–122.649636"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McCracken",
                    "value": "McCracken"
                },
                {
                    "rawValue": "5,928",
                    "value": "5,928"
                },
                {
                    "rawValue": 37.053688,
                    "value": "37.053688"
                },
                {
                    "rawValue": "–88.712378",
                    "value": "–88.712378"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Putnam",
                    "value": "Putnam"
                },
                {
                    "rawValue": "5,916",
                    "value": "5,916"
                },
                {
                    "rawValue": 29.606006,
                    "value": "29.606006"
                },
                {
                    "rawValue": "–81.740894",
                    "value": "–81.740894"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pulaski",
                    "value": "Pulaski"
                },
                {
                    "rawValue": "5,912",
                    "value": "5,912"
                },
                {
                    "rawValue": 37.108312,
                    "value": "37.108312"
                },
                {
                    "rawValue": "–84.579986",
                    "value": "–84.579986"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Joplin",
                    "value": "Joplin"
                },
                {
                    "rawValue": "5,882",
                    "value": "5,882"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bedford",
                    "value": "Bedford"
                },
                {
                    "rawValue": "5,879",
                    "value": "5,879"
                },
                {
                    "rawValue": 35.513659999999994,
                    "value": "35.513659999999994"
                },
                {
                    "rawValue": "–86.458294",
                    "value": "–86.458294"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bedford",
                    "value": "Bedford"
                },
                {
                    "rawValue": "5,871",
                    "value": "5,871"
                },
                {
                    "rawValue": 37.312408000000005,
                    "value": "37.312408000000005"
                },
                {
                    "rawValue": "–79.527947",
                    "value": "–79.527947"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kandiyohi",
                    "value": "Kandiyohi"
                },
                {
                    "rawValue": "5,849",
                    "value": "5,849"
                },
                {
                    "rawValue": 45.152714,
                    "value": "45.152714"
                },
                {
                    "rawValue": "–95.004981",
                    "value": "–95.004981"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harrisonburg city",
                    "value": "Harrisonburg city"
                },
                {
                    "rawValue": "5,845",
                    "value": "5,845"
                },
                {
                    "rawValue": 38.436013,
                    "value": "38.436013"
                },
                {
                    "rawValue": "–78.874197",
                    "value": "–78.874197"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Yuba",
                    "value": "Yuba"
                },
                {
                    "rawValue": "5,840",
                    "value": "5,840"
                },
                {
                    "rawValue": 39.270026,
                    "value": "39.270026"
                },
                {
                    "rawValue": "–121.344280",
                    "value": "–121.344280"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "San Benito",
                    "value": "San Benito"
                },
                {
                    "rawValue": "5,800",
                    "value": "5,800"
                },
                {
                    "rawValue": 36.610702,
                    "value": "36.610702"
                },
                {
                    "rawValue": "–121.085296",
                    "value": "–121.085296"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Crittenden",
                    "value": "Crittenden"
                },
                {
                    "rawValue": "5,796",
                    "value": "5,796"
                },
                {
                    "rawValue": 35.211878000000006,
                    "value": "35.211878000000006"
                },
                {
                    "rawValue": "–90.315331",
                    "value": "–90.315331"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Catoosa",
                    "value": "Catoosa"
                },
                {
                    "rawValue": "5,796",
                    "value": "5,796"
                },
                {
                    "rawValue": 34.899392999999996,
                    "value": "34.899392999999996"
                },
                {
                    "rawValue": "–85.137353",
                    "value": "–85.137353"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Duplin",
                    "value": "Duplin"
                },
                {
                    "rawValue": "5,790",
                    "value": "5,790"
                },
                {
                    "rawValue": 34.934403,
                    "value": "34.934403"
                },
                {
                    "rawValue": "–77.933543",
                    "value": "–77.933543"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lapeer",
                    "value": "Lapeer"
                },
                {
                    "rawValue": "5,788",
                    "value": "5,788"
                },
                {
                    "rawValue": 43.088633,
                    "value": "43.088633"
                },
                {
                    "rawValue": "–83.224325",
                    "value": "–83.224325"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Loudon",
                    "value": "Loudon"
                },
                {
                    "rawValue": "5,781",
                    "value": "5,781"
                },
                {
                    "rawValue": 35.73745,
                    "value": "35.73745"
                },
                {
                    "rawValue": "–84.316204",
                    "value": "–84.316204"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lafayette",
                    "value": "Lafayette"
                },
                {
                    "rawValue": "5,779",
                    "value": "5,779"
                },
                {
                    "rawValue": 34.349298,
                    "value": "34.349298"
                },
                {
                    "rawValue": "–89.485903",
                    "value": "–89.485903"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carter",
                    "value": "Carter"
                },
                {
                    "rawValue": "5,774",
                    "value": "5,774"
                },
                {
                    "rawValue": 34.251847999999995,
                    "value": "34.251847999999995"
                },
                {
                    "rawValue": "–97.287927",
                    "value": "–97.287927"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Caguas",
                    "value": "Caguas"
                },
                {
                    "rawValue": "5,768",
                    "value": "5,768"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "5,756",
                    "value": "5,756"
                },
                {
                    "rawValue": 36.048479,
                    "value": "36.048479"
                },
                {
                    "rawValue": "–83.440966",
                    "value": "–83.440966"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Lawrence",
                    "value": "St. Lawrence"
                },
                {
                    "rawValue": "5,748",
                    "value": "5,748"
                },
                {
                    "rawValue": 44.488113,
                    "value": "44.488113"
                },
                {
                    "rawValue": "–75.074311",
                    "value": "–75.074311"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Waupaca",
                    "value": "Waupaca"
                },
                {
                    "rawValue": "5,732",
                    "value": "5,732"
                },
                {
                    "rawValue": 44.478004,
                    "value": "44.478004"
                },
                {
                    "rawValue": "–88.967006",
                    "value": "–88.967006"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Spalding",
                    "value": "Spalding"
                },
                {
                    "rawValue": "5,719",
                    "value": "5,719"
                },
                {
                    "rawValue": 33.262389,
                    "value": "33.262389"
                },
                {
                    "rawValue": "–84.286067",
                    "value": "–84.286067"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grady",
                    "value": "Grady"
                },
                {
                    "rawValue": "5,710",
                    "value": "5,710"
                },
                {
                    "rawValue": 35.021058000000004,
                    "value": "35.021058000000004"
                },
                {
                    "rawValue": "–97.886890",
                    "value": "–97.886890"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Montcalm",
                    "value": "Montcalm"
                },
                {
                    "rawValue": "5,701",
                    "value": "5,701"
                },
                {
                    "rawValue": 43.312782,
                    "value": "43.312782"
                },
                {
                    "rawValue": "–85.149468",
                    "value": "–85.149468"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lamar",
                    "value": "Lamar"
                },
                {
                    "rawValue": "5,699",
                    "value": "5,699"
                },
                {
                    "rawValue": 33.667263,
                    "value": "33.667263"
                },
                {
                    "rawValue": "–95.570348",
                    "value": "–95.570348"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mississippi",
                    "value": "Mississippi"
                },
                {
                    "rawValue": "5,695",
                    "value": "5,695"
                },
                {
                    "rawValue": 35.766943,
                    "value": "35.766943"
                },
                {
                    "rawValue": "–90.052209",
                    "value": "–90.052209"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gratiot",
                    "value": "Gratiot"
                },
                {
                    "rawValue": "5,693",
                    "value": "5,693"
                },
                {
                    "rawValue": 43.292326,
                    "value": "43.292326"
                },
                {
                    "rawValue": "–84.604690",
                    "value": "–84.604690"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lassen",
                    "value": "Lassen"
                },
                {
                    "rawValue": "5,629",
                    "value": "5,629"
                },
                {
                    "rawValue": 40.721089,
                    "value": "40.721089"
                },
                {
                    "rawValue": "–120.629931",
                    "value": "–120.629931"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Steuben",
                    "value": "Steuben"
                },
                {
                    "rawValue": "5,621",
                    "value": "5,621"
                },
                {
                    "rawValue": 42.266725,
                    "value": "42.266725"
                },
                {
                    "rawValue": "–77.385525",
                    "value": "–77.385525"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Henderson",
                    "value": "Henderson"
                },
                {
                    "rawValue": "5,613",
                    "value": "5,613"
                },
                {
                    "rawValue": 32.211633,
                    "value": "32.211633"
                },
                {
                    "rawValue": "–95.853418",
                    "value": "–95.853418"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ford",
                    "value": "Ford"
                },
                {
                    "rawValue": "5,612",
                    "value": "5,612"
                },
                {
                    "rawValue": 37.688365000000005,
                    "value": "37.688365000000005"
                },
                {
                    "rawValue": "–99.884734",
                    "value": "–99.884734"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Barron",
                    "value": "Barron"
                },
                {
                    "rawValue": "5,604",
                    "value": "5,604"
                },
                {
                    "rawValue": 45.437191999999996,
                    "value": "45.437191999999996"
                },
                {
                    "rawValue": "–91.852892",
                    "value": "–91.852892"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clinton",
                    "value": "Clinton"
                },
                {
                    "rawValue": "5,596",
                    "value": "5,596"
                },
                {
                    "rawValue": 38.606423,
                    "value": "38.606423"
                },
                {
                    "rawValue": "–89.423136",
                    "value": "–89.423136"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Navarro",
                    "value": "Navarro"
                },
                {
                    "rawValue": "5,595",
                    "value": "5,595"
                },
                {
                    "rawValue": 32.04845,
                    "value": "32.04845"
                },
                {
                    "rawValue": "–96.476908",
                    "value": "–96.476908"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shelby",
                    "value": "Shelby"
                },
                {
                    "rawValue": "5,594",
                    "value": "5,594"
                },
                {
                    "rawValue": 39.524135,
                    "value": "39.524135"
                },
                {
                    "rawValue": "–85.792174",
                    "value": "–85.792174"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sauk",
                    "value": "Sauk"
                },
                {
                    "rawValue": "5,592",
                    "value": "5,592"
                },
                {
                    "rawValue": 43.427997999999995,
                    "value": "43.427997999999995"
                },
                {
                    "rawValue": "–89.943329",
                    "value": "–89.943329"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Franklin",
                    "value": "Franklin"
                },
                {
                    "rawValue": "5,589",
                    "value": "5,589"
                },
                {
                    "rawValue": 36.088241,
                    "value": "36.088241"
                },
                {
                    "rawValue": "–78.283090",
                    "value": "–78.283090"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lawrence",
                    "value": "Lawrence"
                },
                {
                    "rawValue": "5,588",
                    "value": "5,588"
                },
                {
                    "rawValue": 35.220476,
                    "value": "35.220476"
                },
                {
                    "rawValue": "–87.396546",
                    "value": "–87.396546"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dearborn",
                    "value": "Dearborn"
                },
                {
                    "rawValue": "5,540",
                    "value": "5,540"
                },
                {
                    "rawValue": 39.151491,
                    "value": "39.151491"
                },
                {
                    "rawValue": "–84.973460",
                    "value": "–84.973460"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lenoir",
                    "value": "Lenoir"
                },
                {
                    "rawValue": "5,529",
                    "value": "5,529"
                },
                {
                    "rawValue": 35.238062,
                    "value": "35.238062"
                },
                {
                    "rawValue": "–77.639023",
                    "value": "–77.639023"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fremont",
                    "value": "Fremont"
                },
                {
                    "rawValue": "5,517",
                    "value": "5,517"
                },
                {
                    "rawValue": 38.455658,
                    "value": "38.455658"
                },
                {
                    "rawValue": "–105.421438",
                    "value": "–105.421438"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lee",
                    "value": "Lee"
                },
                {
                    "rawValue": "5,516",
                    "value": "5,516"
                },
                {
                    "rawValue": 35.476075,
                    "value": "35.476075"
                },
                {
                    "rawValue": "–79.172220",
                    "value": "–79.172220"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cass",
                    "value": "Cass"
                },
                {
                    "rawValue": "5,511",
                    "value": "5,511"
                },
                {
                    "rawValue": 40.753799,
                    "value": "40.753799"
                },
                {
                    "rawValue": "–86.355169",
                    "value": "–86.355169"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cherokee",
                    "value": "Cherokee"
                },
                {
                    "rawValue": "5,504",
                    "value": "5,504"
                },
                {
                    "rawValue": 35.049796,
                    "value": "35.049796"
                },
                {
                    "rawValue": "–81.607647",
                    "value": "–81.607647"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Gadsden",
                    "value": "Gadsden"
                },
                {
                    "rawValue": "5,488",
                    "value": "5,488"
                },
                {
                    "rawValue": 30.57917,
                    "value": "30.57917"
                },
                {
                    "rawValue": "–84.612783",
                    "value": "–84.612783"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cherokee",
                    "value": "Cherokee"
                },
                {
                    "rawValue": "5,476",
                    "value": "5,476"
                },
                {
                    "rawValue": 35.904367,
                    "value": "35.904367"
                },
                {
                    "rawValue": "–94.996796",
                    "value": "–94.996796"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marshall",
                    "value": "Marshall"
                },
                {
                    "rawValue": "5,473",
                    "value": "5,473"
                },
                {
                    "rawValue": 41.325003,
                    "value": "41.325003"
                },
                {
                    "rawValue": "–86.269036",
                    "value": "–86.269036"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Columbia",
                    "value": "Columbia"
                },
                {
                    "rawValue": "5,464",
                    "value": "5,464"
                },
                {
                    "rawValue": 43.471882,
                    "value": "43.471882"
                },
                {
                    "rawValue": "–89.330472",
                    "value": "–89.330472"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Henry",
                    "value": "Henry"
                },
                {
                    "rawValue": "5,461",
                    "value": "5,461"
                },
                {
                    "rawValue": 39.929576000000004,
                    "value": "39.929576000000004"
                },
                {
                    "rawValue": "–85.397338",
                    "value": "–85.397338"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cayuga",
                    "value": "Cayuga"
                },
                {
                    "rawValue": "5,449",
                    "value": "5,449"
                },
                {
                    "rawValue": 43.008546,
                    "value": "43.008546"
                },
                {
                    "rawValue": "–76.574587",
                    "value": "–76.574587"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Atascosa",
                    "value": "Atascosa"
                },
                {
                    "rawValue": "5,443",
                    "value": "5,443"
                },
                {
                    "rawValue": 28.894296,
                    "value": "28.894296"
                },
                {
                    "rawValue": "–98.528187",
                    "value": "–98.528187"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Laurens",
                    "value": "Laurens"
                },
                {
                    "rawValue": "5,440",
                    "value": "5,440"
                },
                {
                    "rawValue": 32.39322,
                    "value": "32.39322"
                },
                {
                    "rawValue": "–82.926317",
                    "value": "–82.926317"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Le Flore",
                    "value": "Le Flore"
                },
                {
                    "rawValue": "5,435",
                    "value": "5,435"
                },
                {
                    "rawValue": 34.899642,
                    "value": "34.899642"
                },
                {
                    "rawValue": "–94.703491",
                    "value": "–94.703491"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "5,426",
                    "value": "5,426"
                },
                {
                    "rawValue": 35.447666,
                    "value": "35.447666"
                },
                {
                    "rawValue": "–84.249786",
                    "value": "–84.249786"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lincoln",
                    "value": "Lincoln"
                },
                {
                    "rawValue": "5,376",
                    "value": "5,376"
                },
                {
                    "rawValue": 39.058568,
                    "value": "39.058568"
                },
                {
                    "rawValue": "–90.957771",
                    "value": "–90.957771"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grant",
                    "value": "Grant"
                },
                {
                    "rawValue": "5,374",
                    "value": "5,374"
                },
                {
                    "rawValue": 42.870062,
                    "value": "42.870062"
                },
                {
                    "rawValue": "–90.695368",
                    "value": "–90.695368"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Polk",
                    "value": "Polk"
                },
                {
                    "rawValue": "5,367",
                    "value": "5,367"
                },
                {
                    "rawValue": 33.995961,
                    "value": "33.995961"
                },
                {
                    "rawValue": "–85.186826",
                    "value": "–85.186826"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Newport",
                    "value": "Newport"
                },
                {
                    "rawValue": "5,347",
                    "value": "5,347"
                },
                {
                    "rawValue": 41.502732,
                    "value": "41.502732"
                },
                {
                    "rawValue": "–71.284063",
                    "value": "–71.284063"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Warren",
                    "value": "Warren"
                },
                {
                    "rawValue": "5,342",
                    "value": "5,342"
                },
                {
                    "rawValue": 35.678282,
                    "value": "35.678282"
                },
                {
                    "rawValue": "–85.777363",
                    "value": "–85.777363"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Granville",
                    "value": "Granville"
                },
                {
                    "rawValue": "5,341",
                    "value": "5,341"
                },
                {
                    "rawValue": 36.299884000000006,
                    "value": "36.299884000000006"
                },
                {
                    "rawValue": "–78.657634",
                    "value": "–78.657634"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Graham",
                    "value": "Graham"
                },
                {
                    "rawValue": "5,322",
                    "value": "5,322"
                },
                {
                    "rawValue": 32.931828,
                    "value": "32.931828"
                },
                {
                    "rawValue": "–109.878310",
                    "value": "–109.878310"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hawkins",
                    "value": "Hawkins"
                },
                {
                    "rawValue": "5,318",
                    "value": "5,318"
                },
                {
                    "rawValue": 36.452206,
                    "value": "36.452206"
                },
                {
                    "rawValue": "–82.931386",
                    "value": "–82.931386"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Eagle",
                    "value": "Eagle"
                },
                {
                    "rawValue": "5,311",
                    "value": "5,311"
                },
                {
                    "rawValue": 39.630638,
                    "value": "39.630638"
                },
                {
                    "rawValue": "–106.692944",
                    "value": "–106.692944"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Union",
                    "value": "Union"
                },
                {
                    "rawValue": "5,303",
                    "value": "5,303"
                },
                {
                    "rawValue": 40.962179,
                    "value": "40.962179"
                },
                {
                    "rawValue": "–77.055475",
                    "value": "–77.055475"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Lawrence",
                    "value": "Lawrence"
                },
                {
                    "rawValue": "5,297",
                    "value": "5,297"
                },
                {
                    "rawValue": 38.603866,
                    "value": "38.603866"
                },
                {
                    "rawValue": "–82.517186",
                    "value": "–82.517186"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coffee",
                    "value": "Coffee"
                },
                {
                    "rawValue": "5,279",
                    "value": "5,279"
                },
                {
                    "rawValue": 31.402183,
                    "value": "31.402183"
                },
                {
                    "rawValue": "–85.989201",
                    "value": "–85.989201"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coles",
                    "value": "Coles"
                },
                {
                    "rawValue": "5,274",
                    "value": "5,274"
                },
                {
                    "rawValue": 39.51368,
                    "value": "39.51368"
                },
                {
                    "rawValue": "–88.220782",
                    "value": "–88.220782"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dyer",
                    "value": "Dyer"
                },
                {
                    "rawValue": "5,262",
                    "value": "5,262"
                },
                {
                    "rawValue": 36.054196000000005,
                    "value": "36.054196000000005"
                },
                {
                    "rawValue": "–89.398306",
                    "value": "–89.398306"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Augusta",
                    "value": "Augusta"
                },
                {
                    "rawValue": "5,258",
                    "value": "5,258"
                },
                {
                    "rawValue": 38.167807,
                    "value": "38.167807"
                },
                {
                    "rawValue": "–79.146682",
                    "value": "–79.146682"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Crow Wing",
                    "value": "Crow Wing"
                },
                {
                    "rawValue": "5,255",
                    "value": "5,255"
                },
                {
                    "rawValue": 46.491114,
                    "value": "46.491114"
                },
                {
                    "rawValue": "–94.071213",
                    "value": "–94.071213"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hunt",
                    "value": "Hunt"
                },
                {
                    "rawValue": "5,255",
                    "value": "5,255"
                },
                {
                    "rawValue": 33.123438,
                    "value": "33.123438"
                },
                {
                    "rawValue": "–96.083807",
                    "value": "–96.083807"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grundy",
                    "value": "Grundy"
                },
                {
                    "rawValue": "5,245",
                    "value": "5,245"
                },
                {
                    "rawValue": 41.29241,
                    "value": "41.29241"
                },
                {
                    "rawValue": "–88.401055",
                    "value": "–88.401055"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Caldwell",
                    "value": "Caldwell"
                },
                {
                    "rawValue": "5,239",
                    "value": "5,239"
                },
                {
                    "rawValue": 29.840421999999997,
                    "value": "29.840421999999997"
                },
                {
                    "rawValue": "–97.631097",
                    "value": "–97.631097"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pike",
                    "value": "Pike"
                },
                {
                    "rawValue": "5,238",
                    "value": "5,238"
                },
                {
                    "rawValue": 37.482067,
                    "value": "37.482067"
                },
                {
                    "rawValue": "–82.402869",
                    "value": "–82.402869"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Coffee",
                    "value": "Coffee"
                },
                {
                    "rawValue": "5,236",
                    "value": "5,236"
                },
                {
                    "rawValue": 31.549245000000003,
                    "value": "31.549245000000003"
                },
                {
                    "rawValue": "–82.844938",
                    "value": "–82.844938"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "5,236",
                    "value": "5,236"
                },
                {
                    "rawValue": 33.273131,
                    "value": "33.273131"
                },
                {
                    "rawValue": "–90.944430",
                    "value": "–90.944430"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Mary's",
                    "value": "St. Mary's"
                },
                {
                    "rawValue": "5,233",
                    "value": "5,233"
                },
                {
                    "rawValue": 38.222666,
                    "value": "38.222666"
                },
                {
                    "rawValue": "–76.534271",
                    "value": "–76.534271"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Union",
                    "value": "Union"
                },
                {
                    "rawValue": "5,202",
                    "value": "5,202"
                },
                {
                    "rawValue": 40.295901,
                    "value": "40.295901"
                },
                {
                    "rawValue": "–83.367042",
                    "value": "–83.367042"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Warren",
                    "value": "Warren"
                },
                {
                    "rawValue": "5,196",
                    "value": "5,196"
                },
                {
                    "rawValue": 41.336769,
                    "value": "41.336769"
                },
                {
                    "rawValue": "–93.564366",
                    "value": "–93.564366"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chittenden",
                    "value": "Chittenden"
                },
                {
                    "rawValue": "5,189",
                    "value": "5,189"
                },
                {
                    "rawValue": 44.460676,
                    "value": "44.460676"
                },
                {
                    "rawValue": "–73.070525",
                    "value": "–73.070525"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Brown",
                    "value": "Brown"
                },
                {
                    "rawValue": "5,183",
                    "value": "5,183"
                },
                {
                    "rawValue": 45.589254,
                    "value": "45.589254"
                },
                {
                    "rawValue": "–98.352175",
                    "value": "–98.352175"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Charles",
                    "value": "St. Charles"
                },
                {
                    "rawValue": "5,175",
                    "value": "5,175"
                },
                {
                    "rawValue": 29.913833,
                    "value": "29.913833"
                },
                {
                    "rawValue": "–90.359314",
                    "value": "–90.359314"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Buffalo",
                    "value": "Buffalo"
                },
                {
                    "rawValue": "5,166",
                    "value": "5,166"
                },
                {
                    "rawValue": 40.855226,
                    "value": "40.855226"
                },
                {
                    "rawValue": "–99.074983",
                    "value": "–99.074983"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Garfield",
                    "value": "Garfield"
                },
                {
                    "rawValue": "5,159",
                    "value": "5,159"
                },
                {
                    "rawValue": 39.599352,
                    "value": "39.599352"
                },
                {
                    "rawValue": "–107.909780",
                    "value": "–107.909780"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clinton",
                    "value": "Clinton"
                },
                {
                    "rawValue": "5,156",
                    "value": "5,156"
                },
                {
                    "rawValue": 42.950455,
                    "value": "42.950455"
                },
                {
                    "rawValue": "–84.591695",
                    "value": "–84.591695"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Newton",
                    "value": "Newton"
                },
                {
                    "rawValue": "5,156",
                    "value": "5,156"
                },
                {
                    "rawValue": 36.908017,
                    "value": "36.908017"
                },
                {
                    "rawValue": "–94.334741",
                    "value": "–94.334741"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Suwannee",
                    "value": "Suwannee"
                },
                {
                    "rawValue": "5,152",
                    "value": "5,152"
                },
                {
                    "rawValue": 30.189244,
                    "value": "30.189244"
                },
                {
                    "rawValue": "–82.992754",
                    "value": "–82.992754"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Indiana",
                    "value": "Indiana"
                },
                {
                    "rawValue": "5,152",
                    "value": "5,152"
                },
                {
                    "rawValue": 40.651432,
                    "value": "40.651432"
                },
                {
                    "rawValue": "–79.087545",
                    "value": "–79.087545"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Noble",
                    "value": "Noble"
                },
                {
                    "rawValue": "5,150",
                    "value": "5,150"
                },
                {
                    "rawValue": 41.400794,
                    "value": "41.400794"
                },
                {
                    "rawValue": "–85.417850",
                    "value": "–85.417850"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Midland",
                    "value": "Midland"
                },
                {
                    "rawValue": "5,139",
                    "value": "5,139"
                },
                {
                    "rawValue": 43.648378,
                    "value": "43.648378"
                },
                {
                    "rawValue": "–84.379220",
                    "value": "–84.379220"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Taney",
                    "value": "Taney"
                },
                {
                    "rawValue": "5,124",
                    "value": "5,124"
                },
                {
                    "rawValue": 36.649827,
                    "value": "36.649827"
                },
                {
                    "rawValue": "–93.042819",
                    "value": "–93.042819"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shawano",
                    "value": "Shawano"
                },
                {
                    "rawValue": "5,120",
                    "value": "5,120"
                },
                {
                    "rawValue": 44.789640999999996,
                    "value": "44.789640999999996"
                },
                {
                    "rawValue": "–88.755813",
                    "value": "–88.755813"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ogle",
                    "value": "Ogle"
                },
                {
                    "rawValue": "5,118",
                    "value": "5,118"
                },
                {
                    "rawValue": 42.041884,
                    "value": "42.041884"
                },
                {
                    "rawValue": "–89.320176",
                    "value": "–89.320176"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Kay",
                    "value": "Kay"
                },
                {
                    "rawValue": "5,107",
                    "value": "5,107"
                },
                {
                    "rawValue": 36.814842,
                    "value": "36.814842"
                },
                {
                    "rawValue": "–97.143755",
                    "value": "–97.143755"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Iron",
                    "value": "Iron"
                },
                {
                    "rawValue": "5,100",
                    "value": "5,100"
                },
                {
                    "rawValue": 37.882727,
                    "value": "37.882727"
                },
                {
                    "rawValue": "–113.290059",
                    "value": "–113.290059"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Summit",
                    "value": "Summit"
                },
                {
                    "rawValue": "5,083",
                    "value": "5,083"
                },
                {
                    "rawValue": 40.87206,
                    "value": "40.87206"
                },
                {
                    "rawValue": "–110.968486",
                    "value": "–110.968486"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Van Buren",
                    "value": "Van Buren"
                },
                {
                    "rawValue": "5,078",
                    "value": "5,078"
                },
                {
                    "rawValue": 42.283986,
                    "value": "42.283986"
                },
                {
                    "rawValue": "–86.305697",
                    "value": "–86.305697"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cecil",
                    "value": "Cecil"
                },
                {
                    "rawValue": "5,074",
                    "value": "5,074"
                },
                {
                    "rawValue": 39.562352000000004,
                    "value": "39.562352000000004"
                },
                {
                    "rawValue": "–75.941584",
                    "value": "–75.941584"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McClain",
                    "value": "McClain"
                },
                {
                    "rawValue": "5,073",
                    "value": "5,073"
                },
                {
                    "rawValue": 35.016414000000005,
                    "value": "35.016414000000005"
                },
                {
                    "rawValue": "–97.449811",
                    "value": "–97.449811"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Belmont",
                    "value": "Belmont"
                },
                {
                    "rawValue": "5,067",
                    "value": "5,067"
                },
                {
                    "rawValue": 40.017682,
                    "value": "40.017682"
                },
                {
                    "rawValue": "–80.967727",
                    "value": "–80.967727"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Darke",
                    "value": "Darke"
                },
                {
                    "rawValue": "5,065",
                    "value": "5,065"
                },
                {
                    "rawValue": 40.132176,
                    "value": "40.132176"
                },
                {
                    "rawValue": "–84.620438",
                    "value": "–84.620438"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chisago",
                    "value": "Chisago"
                },
                {
                    "rawValue": "5,050",
                    "value": "5,050"
                },
                {
                    "rawValue": 45.505444,
                    "value": "45.505444"
                },
                {
                    "rawValue": "–92.903849",
                    "value": "–92.903849"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Habersham",
                    "value": "Habersham"
                },
                {
                    "rawValue": "5,049",
                    "value": "5,049"
                },
                {
                    "rawValue": 34.635108,
                    "value": "34.635108"
                },
                {
                    "rawValue": "–83.526406",
                    "value": "–83.526406"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Halifax",
                    "value": "Halifax"
                },
                {
                    "rawValue": "5,049",
                    "value": "5,049"
                },
                {
                    "rawValue": 36.251438,
                    "value": "36.251438"
                },
                {
                    "rawValue": "–77.644842",
                    "value": "–77.644842"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Clinton",
                    "value": "Clinton"
                },
                {
                    "rawValue": "5,042",
                    "value": "5,042"
                },
                {
                    "rawValue": 41.898073,
                    "value": "41.898073"
                },
                {
                    "rawValue": "–90.534243",
                    "value": "–90.534243"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Knox",
                    "value": "Knox"
                },
                {
                    "rawValue": "5,028",
                    "value": "5,028"
                },
                {
                    "rawValue": 40.930941,
                    "value": "40.930941"
                },
                {
                    "rawValue": "–90.213761",
                    "value": "–90.213761"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cerro Gordo",
                    "value": "Cerro Gordo"
                },
                {
                    "rawValue": "5,028",
                    "value": "5,028"
                },
                {
                    "rawValue": 43.075171000000005,
                    "value": "43.075171000000005"
                },
                {
                    "rawValue": "–93.251266",
                    "value": "–93.251266"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pettis",
                    "value": "Pettis"
                },
                {
                    "rawValue": "5,023",
                    "value": "5,023"
                },
                {
                    "rawValue": 38.727367,
                    "value": "38.727367"
                },
                {
                    "rawValue": "–93.285207",
                    "value": "–93.285207"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Albemarle",
                    "value": "Albemarle"
                },
                {
                    "rawValue": "4,988",
                    "value": "4,988"
                },
                {
                    "rawValue": 38.024184000000005,
                    "value": "38.024184000000005"
                },
                {
                    "rawValue": "–78.553506",
                    "value": "–78.553506"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pontotoc",
                    "value": "Pontotoc"
                },
                {
                    "rawValue": "4,987",
                    "value": "4,987"
                },
                {
                    "rawValue": 34.721071,
                    "value": "34.721071"
                },
                {
                    "rawValue": "–96.692738",
                    "value": "–96.692738"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hardin",
                    "value": "Hardin"
                },
                {
                    "rawValue": "4,979",
                    "value": "4,979"
                },
                {
                    "rawValue": 30.329612,
                    "value": "30.329612"
                },
                {
                    "rawValue": "–94.393149",
                    "value": "–94.393149"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Webster",
                    "value": "Webster"
                },
                {
                    "rawValue": "4,978",
                    "value": "4,978"
                },
                {
                    "rawValue": 42.434397,
                    "value": "42.434397"
                },
                {
                    "rawValue": "–94.179157",
                    "value": "–94.179157"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carbon",
                    "value": "Carbon"
                },
                {
                    "rawValue": "4,971",
                    "value": "4,971"
                },
                {
                    "rawValue": 40.917833,
                    "value": "40.917833"
                },
                {
                    "rawValue": "–75.709428",
                    "value": "–75.709428"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Curry",
                    "value": "Curry"
                },
                {
                    "rawValue": "4,962",
                    "value": "4,962"
                },
                {
                    "rawValue": 34.572984000000005,
                    "value": "34.572984000000005"
                },
                {
                    "rawValue": "–103.346055",
                    "value": "–103.346055"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Armstrong",
                    "value": "Armstrong"
                },
                {
                    "rawValue": "4,958",
                    "value": "4,958"
                },
                {
                    "rawValue": 40.812379,
                    "value": "40.812379"
                },
                {
                    "rawValue": "–79.464128",
                    "value": "–79.464128"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "4,953",
                    "value": "4,953"
                },
                {
                    "rawValue": 43.995371,
                    "value": "43.995371"
                },
                {
                    "rawValue": "–76.053522",
                    "value": "–76.053522"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Morton",
                    "value": "Morton"
                },
                {
                    "rawValue": "4,951",
                    "value": "4,951"
                },
                {
                    "rawValue": 46.713789,
                    "value": "46.713789"
                },
                {
                    "rawValue": "–101.279743",
                    "value": "–101.279743"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Vermilion",
                    "value": "Vermilion"
                },
                {
                    "rawValue": "4,941",
                    "value": "4,941"
                },
                {
                    "rawValue": 29.786872,
                    "value": "29.786872"
                },
                {
                    "rawValue": "–92.290090",
                    "value": "–92.290090"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Androscoggin",
                    "value": "Androscoggin"
                },
                {
                    "rawValue": "4,930",
                    "value": "4,930"
                },
                {
                    "rawValue": 44.167681,
                    "value": "44.167681"
                },
                {
                    "rawValue": "–70.207435",
                    "value": "–70.207435"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sullivan",
                    "value": "Sullivan"
                },
                {
                    "rawValue": "4,929",
                    "value": "4,929"
                },
                {
                    "rawValue": 41.720176,
                    "value": "41.720176"
                },
                {
                    "rawValue": "–74.764680",
                    "value": "–74.764680"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fremont",
                    "value": "Fremont"
                },
                {
                    "rawValue": "4,927",
                    "value": "4,927"
                },
                {
                    "rawValue": 43.055303,
                    "value": "43.055303"
                },
                {
                    "rawValue": "–108.605531",
                    "value": "–108.605531"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harrison",
                    "value": "Harrison"
                },
                {
                    "rawValue": "4,922",
                    "value": "4,922"
                },
                {
                    "rawValue": 39.279199,
                    "value": "39.279199"
                },
                {
                    "rawValue": "–80.386487",
                    "value": "–80.386487"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Berkshire",
                    "value": "Berkshire"
                },
                {
                    "rawValue": "4,921",
                    "value": "4,921"
                },
                {
                    "rawValue": 42.375314,
                    "value": "42.375314"
                },
                {
                    "rawValue": "–73.213948",
                    "value": "–73.213948"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Hot Spring",
                    "value": "Hot Spring"
                },
                {
                    "rawValue": "4,913",
                    "value": "4,913"
                },
                {
                    "rawValue": 34.315177,
                    "value": "34.315177"
                },
                {
                    "rawValue": "–92.944147",
                    "value": "–92.944147"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "McDowell",
                    "value": "McDowell"
                },
                {
                    "rawValue": "4,911",
                    "value": "4,911"
                },
                {
                    "rawValue": 35.682232,
                    "value": "35.682232"
                },
                {
                    "rawValue": "–82.048029",
                    "value": "–82.048029"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "4,906",
                    "value": "4,906"
                },
                {
                    "rawValue": 36.70438,
                    "value": "36.70438"
                },
                {
                    "rawValue": "–95.906155",
                    "value": "–95.906155"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Box Elder",
                    "value": "Box Elder"
                },
                {
                    "rawValue": "4,900",
                    "value": "4,900"
                },
                {
                    "rawValue": 41.476021,
                    "value": "41.476021"
                },
                {
                    "rawValue": "–113.052922",
                    "value": "–113.052922"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Chippewa",
                    "value": "Chippewa"
                },
                {
                    "rawValue": "4,896",
                    "value": "4,896"
                },
                {
                    "rawValue": 46.321819,
                    "value": "46.321819"
                },
                {
                    "rawValue": "–84.520630",
                    "value": "–84.520630"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Otter Tail",
                    "value": "Otter Tail"
                },
                {
                    "rawValue": "4,895",
                    "value": "4,895"
                },
                {
                    "rawValue": 46.405725,
                    "value": "46.405725"
                },
                {
                    "rawValue": "–95.714578",
                    "value": "–95.714578"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Huron",
                    "value": "Huron"
                },
                {
                    "rawValue": "4,895",
                    "value": "4,895"
                },
                {
                    "rawValue": 41.14508,
                    "value": "41.14508"
                },
                {
                    "rawValue": "–82.594641",
                    "value": "–82.594641"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Martin",
                    "value": "St. Martin"
                },
                {
                    "rawValue": "4,889",
                    "value": "4,889"
                },
                {
                    "rawValue": 30.121433000000003,
                    "value": "30.121433000000003"
                },
                {
                    "rawValue": "–91.611481",
                    "value": "–91.611481"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Raleigh",
                    "value": "Raleigh"
                },
                {
                    "rawValue": "4,856",
                    "value": "4,856"
                },
                {
                    "rawValue": 37.76247,
                    "value": "37.76247"
                },
                {
                    "rawValue": "–81.264671",
                    "value": "–81.264671"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jefferson",
                    "value": "Jefferson"
                },
                {
                    "rawValue": "4,852",
                    "value": "4,852"
                },
                {
                    "rawValue": 40.399188,
                    "value": "40.399188"
                },
                {
                    "rawValue": "–80.761410",
                    "value": "–80.761410"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "St. Joseph",
                    "value": "St. Joseph"
                },
                {
                    "rawValue": "4,845",
                    "value": "4,845"
                },
                {
                    "rawValue": 41.911488,
                    "value": "41.911488"
                },
                {
                    "rawValue": "–85.522870",
                    "value": "–85.522870"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marquette",
                    "value": "Marquette"
                },
                {
                    "rawValue": "4,844",
                    "value": "4,844"
                },
                {
                    "rawValue": 46.656597,
                    "value": "46.656597"
                },
                {
                    "rawValue": "–87.584028",
                    "value": "–87.584028"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Johnson",
                    "value": "Johnson"
                },
                {
                    "rawValue": "4,828",
                    "value": "4,828"
                },
                {
                    "rawValue": 38.74588,
                    "value": "38.74588"
                },
                {
                    "rawValue": "–93.805999",
                    "value": "–93.805999"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sandusky",
                    "value": "Sandusky"
                },
                {
                    "rawValue": "4,825",
                    "value": "4,825"
                },
                {
                    "rawValue": 41.355290999999994,
                    "value": "41.355290999999994"
                },
                {
                    "rawValue": "–83.142735",
                    "value": "–83.142735"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pender",
                    "value": "Pender"
                },
                {
                    "rawValue": "4,824",
                    "value": "4,824"
                },
                {
                    "rawValue": 34.512581,
                    "value": "34.512581"
                },
                {
                    "rawValue": "–77.888029",
                    "value": "–77.888029"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Sioux",
                    "value": "Sioux"
                },
                {
                    "rawValue": "4,821",
                    "value": "4,821"
                },
                {
                    "rawValue": 43.082854,
                    "value": "43.082854"
                },
                {
                    "rawValue": "–96.177929",
                    "value": "–96.177929"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Callaway",
                    "value": "Callaway"
                },
                {
                    "rawValue": "4,812",
                    "value": "4,812"
                },
                {
                    "rawValue": 38.835966,
                    "value": "38.835966"
                },
                {
                    "rawValue": "–91.924089",
                    "value": "–91.924089"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Walla Walla",
                    "value": "Walla Walla"
                },
                {
                    "rawValue": "4,811",
                    "value": "4,811"
                },
                {
                    "rawValue": 46.254606,
                    "value": "46.254606"
                },
                {
                    "rawValue": "–118.480374",
                    "value": "–118.480374"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Washington",
                    "value": "Washington"
                },
                {
                    "rawValue": "4,798",
                    "value": "4,798"
                },
                {
                    "rawValue": 39.450684,
                    "value": "39.450684"
                },
                {
                    "rawValue": "–81.490653",
                    "value": "–81.490653"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Franklin",
                    "value": "Franklin"
                },
                {
                    "rawValue": "4,798",
                    "value": "4,798"
                },
                {
                    "rawValue": 35.155926,
                    "value": "35.155926"
                },
                {
                    "rawValue": "–86.099203",
                    "value": "–86.099203"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Salem",
                    "value": "Salem"
                },
                {
                    "rawValue": "4,797",
                    "value": "4,797"
                },
                {
                    "rawValue": 39.573828000000006,
                    "value": "39.573828000000006"
                },
                {
                    "rawValue": "–75.357356",
                    "value": "–75.357356"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Seneca",
                    "value": "Seneca"
                },
                {
                    "rawValue": "4,772",
                    "value": "4,772"
                },
                {
                    "rawValue": 41.120008,
                    "value": "41.120008"
                },
                {
                    "rawValue": "–83.127436",
                    "value": "–83.127436"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Edgecombe",
                    "value": "Edgecombe"
                },
                {
                    "rawValue": "4,766",
                    "value": "4,766"
                },
                {
                    "rawValue": 35.917055,
                    "value": "35.917055"
                },
                {
                    "rawValue": "–77.602655",
                    "value": "–77.602655"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oconto",
                    "value": "Oconto"
                },
                {
                    "rawValue": "4,747",
                    "value": "4,747"
                },
                {
                    "rawValue": 44.996575,
                    "value": "44.996575"
                },
                {
                    "rawValue": "–88.206516",
                    "value": "–88.206516"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tift",
                    "value": "Tift"
                },
                {
                    "rawValue": "4,737",
                    "value": "4,737"
                },
                {
                    "rawValue": 31.457003000000004,
                    "value": "31.457003000000004"
                },
                {
                    "rawValue": "–83.525931",
                    "value": "–83.525931"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pittsylvania",
                    "value": "Pittsylvania"
                },
                {
                    "rawValue": "4,733",
                    "value": "4,733"
                },
                {
                    "rawValue": 36.821721000000004,
                    "value": "36.821721000000004"
                },
                {
                    "rawValue": "–79.398502",
                    "value": "–79.398502"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Columbia",
                    "value": "Columbia"
                },
                {
                    "rawValue": "4,716",
                    "value": "4,716"
                },
                {
                    "rawValue": 41.045517,
                    "value": "41.045517"
                },
                {
                    "rawValue": "–76.404260",
                    "value": "–76.404260"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stephens",
                    "value": "Stephens"
                },
                {
                    "rawValue": "4,713",
                    "value": "4,713"
                },
                {
                    "rawValue": 34.481361,
                    "value": "34.481361"
                },
                {
                    "rawValue": "–97.855607",
                    "value": "–97.855607"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Fayette",
                    "value": "Fayette"
                },
                {
                    "rawValue": "4,706",
                    "value": "4,706"
                },
                {
                    "rawValue": 35.196993,
                    "value": "35.196993"
                },
                {
                    "rawValue": "–89.413803",
                    "value": "–89.413803"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Medina",
                    "value": "Medina"
                },
                {
                    "rawValue": "4,698",
                    "value": "4,698"
                },
                {
                    "rawValue": 29.353661,
                    "value": "29.353661"
                },
                {
                    "rawValue": "–99.111085",
                    "value": "–99.111085"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dale",
                    "value": "Dale"
                },
                {
                    "rawValue": "4,697",
                    "value": "4,697"
                },
                {
                    "rawValue": 31.430653999999997,
                    "value": "31.430653999999997"
                },
                {
                    "rawValue": "–85.609476",
                    "value": "–85.609476"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Campbell",
                    "value": "Campbell"
                },
                {
                    "rawValue": "4,691",
                    "value": "4,691"
                },
                {
                    "rawValue": 44.241321,
                    "value": "44.241321"
                },
                {
                    "rawValue": "–105.552029",
                    "value": "–105.552029"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Ware",
                    "value": "Ware"
                },
                {
                    "rawValue": "4,688",
                    "value": "4,688"
                },
                {
                    "rawValue": 31.050881,
                    "value": "31.050881"
                },
                {
                    "rawValue": "–82.421507",
                    "value": "–82.421507"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dodge",
                    "value": "Dodge"
                },
                {
                    "rawValue": "4,687",
                    "value": "4,687"
                },
                {
                    "rawValue": 41.577008,
                    "value": "41.577008"
                },
                {
                    "rawValue": "–96.645853",
                    "value": "–96.645853"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Boyd",
                    "value": "Boyd"
                },
                {
                    "rawValue": "4,683",
                    "value": "4,683"
                },
                {
                    "rawValue": 38.360003999999996,
                    "value": "38.360003999999996"
                },
                {
                    "rawValue": "–82.681406",
                    "value": "–82.681406"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Athens",
                    "value": "Athens"
                },
                {
                    "rawValue": "4,682",
                    "value": "4,682"
                },
                {
                    "rawValue": 39.333847999999996,
                    "value": "39.333847999999996"
                },
                {
                    "rawValue": "–82.046008",
                    "value": "–82.046008"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Marshall",
                    "value": "Marshall"
                },
                {
                    "rawValue": "4,672",
                    "value": "4,672"
                },
                {
                    "rawValue": 42.041691,
                    "value": "42.041691"
                },
                {
                    "rawValue": "–92.981452",
                    "value": "–92.981452"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "4,666",
                    "value": "4,666"
                },
                {
                    "rawValue": 38.911957,
                    "value": "38.911957"
                },
                {
                    "rawValue": "–86.042516",
                    "value": "–86.042516"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Nelson",
                    "value": "Nelson"
                },
                {
                    "rawValue": "4,650",
                    "value": "4,650"
                },
                {
                    "rawValue": 37.803188,
                    "value": "37.803188"
                },
                {
                    "rawValue": "–85.465955",
                    "value": "–85.465955"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Branch",
                    "value": "Branch"
                },
                {
                    "rawValue": "4,646",
                    "value": "4,646"
                },
                {
                    "rawValue": 41.918585,
                    "value": "41.918585"
                },
                {
                    "rawValue": "–85.066523",
                    "value": "–85.066523"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bolivar",
                    "value": "Bolivar"
                },
                {
                    "rawValue": "4,641",
                    "value": "4,641"
                },
                {
                    "rawValue": 33.799278,
                    "value": "33.799278"
                },
                {
                    "rawValue": "–90.884476",
                    "value": "–90.884476"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mifflin",
                    "value": "Mifflin"
                },
                {
                    "rawValue": "4,638",
                    "value": "4,638"
                },
                {
                    "rawValue": 40.61189,
                    "value": "40.61189"
                },
                {
                    "rawValue": "–77.620661",
                    "value": "–77.620661"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Jackson",
                    "value": "Jackson"
                },
                {
                    "rawValue": "4,637",
                    "value": "4,637"
                },
                {
                    "rawValue": 37.786096,
                    "value": "37.786096"
                },
                {
                    "rawValue": "–89.381212",
                    "value": "–89.381212"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Dunn",
                    "value": "Dunn"
                },
                {
                    "rawValue": "4,635",
                    "value": "4,635"
                },
                {
                    "rawValue": 44.947741,
                    "value": "44.947741"
                },
                {
                    "rawValue": "–91.897720",
                    "value": "–91.897720"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Scott",
                    "value": "Scott"
                },
                {
                    "rawValue": "4,633",
                    "value": "4,633"
                },
                {
                    "rawValue": 37.047793,
                    "value": "37.047793"
                },
                {
                    "rawValue": "–89.568098",
                    "value": "–89.568098"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Herkimer",
                    "value": "Herkimer"
                },
                {
                    "rawValue": "4,621",
                    "value": "4,621"
                },
                {
                    "rawValue": 43.461635,
                    "value": "43.461635"
                },
                {
                    "rawValue": "–74.894694",
                    "value": "–74.894694"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Tehama",
                    "value": "Tehama"
                },
                {
                    "rawValue": "4,620",
                    "value": "4,620"
                },
                {
                    "rawValue": 40.126156,
                    "value": "40.126156"
                },
                {
                    "rawValue": "–122.232276",
                    "value": "–122.232276"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Mercer",
                    "value": "Mercer"
                },
                {
                    "rawValue": "4,605",
                    "value": "4,605"
                },
                {
                    "rawValue": 40.535333,
                    "value": "40.535333"
                },
                {
                    "rawValue": "–84.632059",
                    "value": "–84.632059"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Benton",
                    "value": "Benton"
                },
                {
                    "rawValue": "4,604",
                    "value": "4,604"
                },
                {
                    "rawValue": 45.701227,
                    "value": "45.701227"
                },
                {
                    "rawValue": "–94.001440",
                    "value": "–94.001440"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Harrison",
                    "value": "Harrison"
                },
                {
                    "rawValue": "4,592",
                    "value": "4,592"
                },
                {
                    "rawValue": 32.547993,
                    "value": "32.547993"
                },
                {
                    "rawValue": "–94.374425",
                    "value": "–94.374425"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Elko",
                    "value": "Elko"
                },
                {
                    "rawValue": "4,590",
                    "value": "4,590"
                },
                {
                    "rawValue": 41.141133,
                    "value": "41.141133"
                },
                {
                    "rawValue": "–115.351424",
                    "value": "–115.351424"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Auglaize",
                    "value": "Auglaize"
                },
                {
                    "rawValue": "4,571",
                    "value": "4,571"
                },
                {
                    "rawValue": 40.561309,
                    "value": "40.561309"
                },
                {
                    "rawValue": "–84.224018",
                    "value": "–84.224018"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Murray",
                    "value": "Murray"
                },
                {
                    "rawValue": "4,567",
                    "value": "4,567"
                },
                {
                    "rawValue": 34.797096999999994,
                    "value": "34.797096999999994"
                },
                {
                    "rawValue": "–84.737990",
                    "value": "–84.737990"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Skagit",
                    "value": "Skagit"
                },
                {
                    "rawValue": "4,567",
                    "value": "4,567"
                },
                {
                    "rawValue": 48.493066,
                    "value": "48.493066"
                },
                {
                    "rawValue": "–121.816278",
                    "value": "–121.816278"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Wayne",
                    "value": "Wayne"
                },
                {
                    "rawValue": "4,565",
                    "value": "4,565"
                },
                {
                    "rawValue": 43.458758,
                    "value": "43.458758"
                },
                {
                    "rawValue": "–77.063164",
                    "value": "–77.063164"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Crawford",
                    "value": "Crawford"
                },
                {
                    "rawValue": "4,559",
                    "value": "4,559"
                },
                {
                    "rawValue": 37.505628,
                    "value": "37.505628"
                },
                {
                    "rawValue": "–94.853941",
                    "value": "–94.853941"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Otero",
                    "value": "Otero"
                },
                {
                    "rawValue": "4,540",
                    "value": "4,540"
                },
                {
                    "rawValue": 32.588776,
                    "value": "32.588776"
                },
                {
                    "rawValue": "–105.781079",
                    "value": "–105.781079"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Osage",
                    "value": "Osage"
                },
                {
                    "rawValue": "4,519",
                    "value": "4,519"
                },
                {
                    "rawValue": 36.62468,
                    "value": "36.62468"
                },
                {
                    "rawValue": "–96.408385",
                    "value": "–96.408385"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cattaraugus",
                    "value": "Cattaraugus"
                },
                {
                    "rawValue": "4,518",
                    "value": "4,518"
                },
                {
                    "rawValue": 42.244853000000006,
                    "value": "42.244853000000006"
                },
                {
                    "rawValue": "–78.681006",
                    "value": "–78.681006"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Scotts Bluff",
                    "value": "Scotts Bluff"
                },
                {
                    "rawValue": "4,515",
                    "value": "4,515"
                },
                {
                    "rawValue": 41.851589000000004,
                    "value": "41.851589000000004"
                },
                {
                    "rawValue": "–103.705860",
                    "value": "–103.705860"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Williams",
                    "value": "Williams"
                },
                {
                    "rawValue": "4,515",
                    "value": "4,515"
                },
                {
                    "rawValue": 48.345867,
                    "value": "48.345867"
                },
                {
                    "rawValue": "–103.487400",
                    "value": "–103.487400"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Cowlitz",
                    "value": "Cowlitz"
                },
                {
                    "rawValue": "4,512",
                    "value": "4,512"
                },
                {
                    "rawValue": 46.185922999999995,
                    "value": "46.185922999999995"
                },
                {
                    "rawValue": "–122.658682",
                    "value": "–122.658682"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Howard",
                    "value": "Howard"
                },
                {
                    "rawValue": "4,510",
                    "value": "4,510"
                },
                {
                    "rawValue": 32.303583,
                    "value": "32.303583"
                },
                {
                    "rawValue": "–101.438530",
                    "value": "–101.438530"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Genesee",
                    "value": "Genesee"
                },
                {
                    "rawValue": "4,508",
                    "value": "4,508"
                },
                {
                    "rawValue": 43.00091,
                    "value": "43.00091"
                },
                {
                    "rawValue": "–78.192778",
                    "value": "–78.192778"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Effingham",
                    "value": "Effingham"
                },
                {
                    "rawValue": "4,507",
                    "value": "4,507"
                },
                {
                    "rawValue": 39.047694,
                    "value": "39.047694"
                },
                {
                    "rawValue": "–88.592786",
                    "value": "–88.592786"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Carteret",
                    "value": "Carteret"
                },
                {
                    "rawValue": "4,507",
                    "value": "4,507"
                },
                {
                    "rawValue": 34.858313,
                    "value": "34.858313"
                },
                {
                    "rawValue": "–76.526967",
                    "value": "–76.526967"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Colquitt",
                    "value": "Colquitt"
                },
                {
                    "rawValue": "4,501",
                    "value": "4,501"
                },
                {
                    "rawValue": 31.189758,
                    "value": "31.189758"
                },
                {
                    "rawValue": "–83.769741",
                    "value": "–83.769741"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Pittsburg",
                    "value": "Pittsburg"
                },
                {
                    "rawValue": "4,486",
                    "value": "4,486"
                },
                {
                    "rawValue": 34.925540000000005,
                    "value": "34.925540000000005"
                },
                {
                    "rawValue": "–95.748130",
                    "value": "–95.748130"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Newberry",
                    "value": "Newberry"
                },
                {
                    "rawValue": "4,471",
                    "value": "4,471"
                },
                {
                    "rawValue": 34.28973,
                    "value": "34.28973"
                },
                {
                    "rawValue": "–81.600053",
                    "value": "–81.600053"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Bradford",
                    "value": "Bradford"
                },
                {
                    "rawValue": "4,466",
                    "value": "4,466"
                },
                {
                    "rawValue": 41.791495,
                    "value": "41.791495"
                },
                {
                    "rawValue": "–76.502124",
                    "value": "–76.502124"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Danville city",
                    "value": "Danville city"
                },
                {
                    "rawValue": "4,452",
                    "value": "4,452"
                },
                {
                    "rawValue": 36.583334,
                    "value": "36.583334"
                },
                {
                    "rawValue": "–79.408071",
                    "value": "–79.408071"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Vance",
                    "value": "Vance"
                },
                {
                    "rawValue": "4,450",
                    "value": "4,450"
                },
                {
                    "rawValue": 36.365481,
                    "value": "36.365481"
                },
                {
                    "rawValue": "–78.405434",
                    "value": "–78.405434"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Grand Traverse",
                    "value": "Grand Traverse"
                },
                {
                    "rawValue": "4,447",
                    "value": "4,447"
                },
                {
                    "rawValue": 44.718688,
                    "value": "44.718688"
                },
                {
                    "rawValue": "–85.553848",
                    "value": "–85.553848"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Oktibbeha",
                    "value": "Oktibbeha"
                },
                {
                    "rawValue": "4,444",
                    "value": "4,444"
                },
                {
                    "rawValue": 33.422313,
                    "value": "33.422313"
                },
                {
                    "rawValue": "–88.876151",
                    "value": "–88.876151"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Delaware",
                    "value": "Delaware"
                },
                {
                    "rawValue": "4,438",
                    "value": "4,438"
                },
                {
                    "rawValue": 36.393369,
                    "value": "36.393369"
                },
                {
                    "rawValue": "–94.808206",
                    "value": "–94.808206"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Monroe",
                    "value": "Monroe"
                },
                {
                    "rawValue": "4,437",
                    "value": "4,437"
                },
                {
                    "rawValue": 43.945175,
                    "value": "43.945175"
                },
                {
                    "rawValue": "–90.619969",
                    "value": "–90.619969"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Stark",
                    "value": "Stark"
                },
                {
                    "rawValue": "4,433",
                    "value": "4,433"
                },
                {
                    "rawValue": 46.817031,
                    "value": "46.817031"
                },
                {
                    "rawValue": "–102.662026",
                    "value": "–102.662026"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shelby",
                    "value": "Shelby"
                },
                {
                    "rawValue": "4,430",
                    "value": "4,430"
                },
                {
                    "rawValue": 40.33668,
                    "value": "40.33668"
                },
                {
                    "rawValue": "–84.204143",
                    "value": "–84.204143"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Guaynabo",
                    "value": "Guaynabo"
                },
                {
                    "rawValue": "4,417",
                    "value": "4,417"
                },
                {
                    "rawValue": "",
                    "value": ""
                },
                {
                    "rawValue": "",
                    "value": ""
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Shelby",
                    "value": "Shelby"
                },
                {
                    "rawValue": "4,416",
                    "value": "4,416"
                },
                {
                    "rawValue": 38.239426,
                    "value": "38.239426"
                },
                {
                    "rawValue": "–85.228360",
                    "value": "–85.228360"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Huntingdon",
                    "value": "Huntingdon"
                },
                {
                    "rawValue": "4,415",
                    "value": "4,415"
                },
                {
                    "rawValue": 40.422321000000004,
                    "value": "40.422321000000004"
                },
                {
                    "rawValue": "–77.968584",
                    "value": "–77.968584"
                }
            ]
        },
        {
            "cells": [
                {
                    "rawValue": "Macoupin",
                    "value": "Macoupin"
                },
                {
                    "rawValue": "4,407",
                    "value": "4,407"
                },
                {
                    "rawValue": 39.2659,
                    "value": "39.2659"
                },
                {
                    "rawValue": "–89.926344",
                    "value": "–89.926344"
                }
            ]
        }
    ],
    "filters": null,
    "sortedBy": null,
    "page": 0,
    "limit": 1000,
    "totalRecords": 1000,
    "queryId": "q1"
}
```

## HINT: Sample queries
* Sample queries (to **Covid-19 US Counties** dataset)
    * Total cases by county // you'll get also the lat and long data for being used in maps
    * Total cases by state
    * Total Deaths
    * Total Deaths split by months
    * Total Deaths february 2021

* Sample queries (to **Dati regionali** dataset)
    * new positives by regions // you'll get also the lat and long data for being used in maps
    * new positives
    * total positives
    * total positives by regions // you'll get also the lat and long data for being used in maps
    * new positives february 2021
