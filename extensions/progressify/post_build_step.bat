if exist "%YYMACROS_project_dir%/extensions/progressify/buildscripts/pre_package_step.js"  (
    node "%YYMACROS_project_dir%/extensions/progressify/buildscripts/pre_package_step.js"
) else (
    echo file not found oh well
)