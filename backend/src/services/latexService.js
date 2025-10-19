// LaTeX/PDF generation using node-latex or child_process with pdflatex
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Compile LaTeX string to PDF file and upload to Cloudinary if required
exports.compileLatexToPDF = async (latexCode, outputPath) => {
    return new Promise((resolve, reject) => {
        const texFile = `${outputPath}.tex`;
        fs.writeFileSync(texFile, latexCode);

        const latexProcess = spawn('pdflatex', ['-output-directory', path.dirname(outputPath), texFile]);
        latexProcess.on('exit', (code) => {
            if (code === 0) {
                const pdfPath = `${outputPath}.pdf`;
                if (fs.existsSync(pdfPath)) {
                    resolve(pdfPath);
                } else {
                    reject(new Error('PDF not generated'));
                }
            } else {
                reject(new Error('LaTeX compilation failed'));
            }
            fs.unlinkSync(texFile); // cleanup .tex file after build
        });
    });
};

// You can add Cloudinary upload logic here if required
