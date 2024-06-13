const blog = {};

blog.Setup = () => {
    blog.SetupHeaders();
}

blog.SetupHeaders = () => {
    for (const header of document.getElementsByTagName('h1')) {
        blog.CreateMagicHeader(header);
    }

    for (const header of document.getElementsByTagName('h2')) {
        blog.CreateMagicHeader(header);
    }
}

blog.CreateMagicHeader = (header) => {
    const text = header.textContent;

    header.textContent = '';

    const charElms = [];
    let weights = [];

    for (const char of text) {
        const charElm = document.createElement('span');

        charElm.textContent = char;

        charElms.push(charElm);

        header.appendChild(charElm);
        weights.push(100);
    }

    setInterval(()=>{
        // Adjust average weights
        const target = 500;
        let toAdd = weights.length * target;

        for (let i = 0; i < weights.length; i++) {
            toAdd -= weights[i];
        }

        weights[0] += toAdd * 0.1;

        for (let i = 0; i < weights.length; i++) {
            if (i > 0) {
                // Average with previous
                const p = (weights[i] + weights[i - 1]) / 2;

                weights[i - 1] = p;
                weights[i] = p;
            }
        }

        // Set weights
        for (let i = 0; i < weights.length; i++) {
            const tfw = `${Math.min(Math.max(Math.round(weights[i]), 100), 1000)}`;
            const tfs = `${1 * Math.round(weights[i]) / target}em`;
            
            if (charElms[i].style.fontWeight != tfw) {
                charElms[i].style.fontWeight = tfw;
            }
            if (charElms[i].style.fontSize != tfs) {
                charElms[i].style.fontSize = tfs;
            }
        }
    });
}

window.onload = () => {
    blog.Setup();
}