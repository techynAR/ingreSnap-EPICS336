# ingreSnap 🔍  

**Empowering informed choices through ingredient analysis**  

## About Us 🌟  

We are a dynamic team of multidisciplinary engineering students from VIT Bhopal University, united by the mission to create innovative solutions that address real-world challenges. Our team, includes:  


(listed in alphabetical order)
- **[Aryan Sharma](https://www.linkedin.com/in/aryan-sharma-techynar/)** *(Group Leader)* - B.Tech CSE Core  
- **[Bachhav Ujjwal Ganesh](https://www.linkedin.com/in/ujjwal-bachhav-26b98824b)** - B.Tech CSE Cybersecurity Specialization  
- **[Faraz Ahmad Khan](https://linkedin.com/in/faraz-ahmad-khan-634a40251)** - B.Tech CSE Cloud Computing Specialization  
- **Fanish Kumar Diwan** - B.Tech CSE Cybersecurity Specialization  
- **[Krishna Teja](https://www.linkedin.com/in/teja-krishna-0778a0279/)** - B.Tech CSE Core  
- **Niranjan Kumar Chaurasiya** - B.Tech CSE Core  
- **[Sameer Kumar](https://www.linkedin.com/in/sameer-kumar-095749249/)** - B.Tech CSE Core  
- **[Sreemukhi Kunche](https://www.linkedin.com/in/sreemukhi-kunche-8a0b1624a)** - B.Tech CSE AI Specialization  
- **[Vikash Kumar Singh](https://www.linkedin.com/in/vikash-kumar-singh-62a948251/)** - B.Tech CSE Cybersecurity Specialization  

This project is conducted under the esteemed guidance of **Dr. Arindam Ghosh**, whose expertise and mentorship have been instrumental in shaping *ingreSnap*.  

### About Our Supervisor  

**Dr. Arindam Ghosh** is a distinguished academic and researcher with a Doctorate from the National Institute of Science Education and Research, Bhubaneswar, specializing in Supramolecular Organic Chemistry (Expanded Porphyrinoid Analogues). He holds an M.Sc. in Chemistry from the Indian Institute of Technology (ISM), Dhanbad, and has over four years of professional experience, including:  

- Postdoctoral research funded by DST-SERB.  
- Service as an Ad-hoc Assistant Professor at NIT Warangal.  
- Over two years in organic medicinal chemistry at TCG Lifesciences Pvt. Ltd.  

Dr. Ghosh has published nine research articles in internationally reputed journals, including *Nature Chemistry, Chemical Science, Organic Letters,* and *Chemistry A European Journal*. His areas of research interest include Organic Supramolecular Chemistry and Organic Medicinal Chemistry.  

---

## Why We Built ingreSnap 💡  

Consumers often struggle to make sense of complex ingredient lists, many of which contain terms that are unfamiliar or ambiguous. This lack of clarity can lead to confusion, especially for those managing allergies or following strict dietary restrictions.  

**ingreSnap** addresses this problem by offering a tool that simplifies ingredient analysis, empowering users to make informed decisions about their food choices.  

---

## Features ✨  

- **Ingredient Analysis**: Gain detailed information about each component in an ingredient list.  
- **Allergen Detection**: Automatically identifies and highlights allergens.  
- **Nutritional Information**: Extracts and displays key nutritional facts.  
- **Smart Text Processing**: Advanced algorithms to clean and process ingredient text.  
- **Local Database**: Comprehensive database of common ingredients, preservatives, and additives.  

---

## Tech Stack 🛠️  

- **Frontend**: React 18, TypeScript, Tailwind CSS  
- **OCR Engine**: Tesseract.js  
- **Build Tool**: Vite  

---

## Key Components 🔑  

- **`Scanner.tsx`**: Main component for image upload and OCR analysis.  
- **`IngredientAnalysis.tsx`**: Displays detailed analysis of extracted ingredients.  
- **`Hero.tsx`**: Landing page component for the website.  
- **`Navigation.tsx`**: Handles the dynamic and modern navigation bar.  

---

## Data Processing Pipeline 🔄  

1. **Image Upload** → **OCR Processing** → **Text Extraction** → **Analysis**  

**Steps Explained:**  
1. User uploads an image containing an ingredient list.  
2. Tesseract.js performs OCR to extract text from the image.  
3. Text processing utilities clean and parse the extracted text.  
4. Ingredients are matched with entries in the local database.  
5. Results are displayed with relevant safety, allergen, and nutritional information.  

---

## How to Access 🚀  

The application is already hosted and accessible at [ingreSnap](https://ingresnap.vercel.app). Simply visit the site to start using the ingredient analysis tool.  

---

## Acknowledgments 🙏  

We extend our gratitude to our supervisor, **Dr. Arindam Ghosh**, for his guidance and support.  
This project reflects the collective effort and dedication of the team to build a meaningful solution for the community.  
