$ErrorActionPreference = "Stop"

$androidSdk = "$env:LOCALAPPDATA\Android\Sdk"
if (-not (Test-Path $androidSdk)) {
  Write-Error "Android SDK not found at $androidSdk. Install Android Studio and the SDK first."
}

$jdkCandidates = @()
$adoptiumRoot = "C:\Program Files\Eclipse Adoptium"
$javaRoot = "C:\Program Files\Java"

if (Test-Path $adoptiumRoot) {
  $jdkCandidates += Get-ChildItem $adoptiumRoot -Directory -Filter "jdk-17*"
}
if (Test-Path $javaRoot) {
  $jdkCandidates += Get-ChildItem $javaRoot -Directory -Filter "jdk-17*"
}

if ($jdkCandidates.Count -eq 0) {
  Write-Error "JDK 17 not found. Install Temurin or Zulu JDK 17 and re-run this script."
}

$jdk = $jdkCandidates | Sort-Object Name -Descending | Select-Object -First 1
$jdkPath = $jdk.FullName
$javaExe = Join-Path $jdkPath "bin\java.exe"
if (-not (Test-Path $javaExe)) {
  Write-Error "Invalid JDK path: $jdkPath"
}

$platformTools = Join-Path $androidSdk "platform-tools"
$emulator = Join-Path $androidSdk "emulator"

setx JAVA_HOME "$jdkPath" | Out-Null
setx ANDROID_SDK_ROOT "$androidSdk" | Out-Null
setx ANDROID_HOME "$androidSdk" | Out-Null

$path = $env:Path
if ($path -notlike "*$platformTools*") { $path = "$path;$platformTools" }
if ($path -notlike "*$emulator*") { $path = "$path;$emulator" }
setx Path "$path" | Out-Null

Write-Output "JAVA_HOME set to $jdkPath"
Write-Output "ANDROID_SDK_ROOT set to $androidSdk"
Write-Output "PATH updated with platform-tools and emulator"
Write-Output "Restart your terminal to apply changes."
