const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

fs.writeFileSync(path.join(process.env.YYMACROS_project_dir,`/env.json`),JSON.stringify(process.env,null,4));

// assemble manifest
const manifest = {
    name: process.env.YYEXTOPT_progressify_name || process.env.YYprojectName,
    short_name: process.env.YYEXTOPT_progressify_short_name || process.env.YYprojectName,
    start_url: process.env.YYEXTOPT_progressify_start_url || "/",
    display: process.env.YYEXTOPT_progressify_display_mode || "standalone",
    background_color: process.env.YYEXTOPT_progressify_background_colour || "#000000",
    theme_color: process.env.YYEXTOPT_progressify_theme_colour || "#ffffff",
    orientation: process.env.YYEXTOPT_progressify_orientation || "any",
    icons: [
        {
            "src": `${process.env.YYPLATFORM_option_html5_foldername}/${process.env.YYEXTOPT_progressify_icon_filename_512}`,
            "type": "image/png", "sizes": "512x512"
        },{
            "src": `${process.env.YYPLATFORM_option_html5_foldername}/${process.env.YYEXTOPT_progressify_icon_filename_192}`,
            "type": "image/png", "sizes": "192x192"
        },
    ]
};

fs.writeFileSync(path.join(process.env.YYoutputFolder, 'manifest.json'),JSON.stringify(manifest,null,4));

// assemble service worker

function recursive_walk_directory(list=[],dir='') {
    const files = fs.readdirSync(dir);
    for (const fname of files) {
        const file = fs.statSync(path.join(dir,fname));
        if (file.isDirectory()) {
            recursive_walk_directory(list,path.join(dir,fname));
        } else {
            list.push(path.join(dir,fname));
        }
    }
    return list;
}

const cache_files = recursive_walk_directory([],path.join(process.env.YYoutputFolder,process.env.YYPLATFORM_option_html5_foldername)).map(v=>v.replace(process.env.YYoutputFolder,'')).map(v=>`.${v}`).map(v=>v.replaceAll('\\','/'));
cache_files.push(`./${process.env.YYPLATFORM_option_html5_outputname}`);

//fs.writeFileSync(path.join(process.env.YYMACROS_project_dir,'cache.json'),JSON.stringify(cache_files));

let sw = fs.readFileSync(path.join(process.env.YYMACROS_project_dir,'/extensions/progressify/sw-template.js'),'utf8');

let cachebust = '';
try {
    cachebust = process.env.YYoutputFolder.match(/\\(\w*)$/)[1] 
} catch(e) {
    cachebust = crypto.randomUUID();
}

sw = sw.replace("{{CACHE_NAME}}",manifest.name.replaceAll(' ','_')+'-'+cachebust);
sw = sw.replace("\"{{ASSET_LIST}}\"",JSON.stringify(cache_files,null,4));

fs.writeFileSync(path.join(process.env.YYoutputFolder,process.env.YYEXTOPT_progressify_service_worker_fname),sw);

console.log(path.join(process.env.YYoutputFolder, 'manifest.json'));