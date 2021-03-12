# Pi Day Coding Competition 2021 rules

## Challenge
Build a **fully working web app** that will allow people to **query a given dataset in natural language**, providing not only the result but also some **context**.

You must:

- Tell users what your web app does and how to use it.
- Provide a text answer.
- Add context to the text answer, using any kind of data visualization.
- Set up tests. Implementing a test-driven deploy would make us even more happy.
- Host code on your Team Github. Fork this repository and send a pull request once everything has been pushed. 
- Create a Readme file for your repository with your web app public url and a summary of how you built it and who did what.

You can use every tool you like and any programming language.  
You have **2 hours to complete** the challenge.  

--> Once finished, send a pull request to your team repository. <--

## Resources available

- EC2: team's machine IP is in the description of your team on Hopin. To work with it:
  1. Download the [PEM file](https://drive.google.com/file/d/17qXe9xXpH9SDqXi5RNPi6wiKDkXKUH_R/view?usp=sharing)
  2. Change permission to PEM file: `chmod 0400 piday-2021.pem`
  3. Login with: `ssh -i piday-2021.pem ubuntu@<ip>`
- APIs that allow you to query in natural language the given datasets. [Tutorial and examples are provided](https://github.com/Pi-Campus/pi-day-2021/blob/main/API.md).
- Datasets on COVID-19 already connected with the given APIs:
  - **Covid-19 US Counties (provided by New York Times):** it contains data about Covid 19 in US 
  - **Dati regionali (provided by Protezione Civile):** it contains regional data about Covid 19 in Italy 
