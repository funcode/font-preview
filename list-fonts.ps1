Add-Type -AssemblyName System.Drawing
$fonts = [System.Drawing.FontFamily]::Families | Sort-Object Name | ForEach-Object { $_.Name }
$fonts | ConvertTo-Json | Out-File "$env:USERPROFILE\Desktop\fonts.json" -Encoding UTF8
