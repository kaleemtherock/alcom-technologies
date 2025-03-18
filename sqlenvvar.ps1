# The script sets persistent environment variables for PostgreSQL

$pgPath = "C:\Program Files\PostgreSQL\17\bin"
$pgData = "C:\Program Files\PostgreSQL\17\data"
$pgDatabase = "postgres"
$pgUser = "postgres"
$pgPort = "5432"
$pgLocaleDir = "C:\Program Files\PostgreSQL\17\share\locale"

# Add PostgreSQL bin folder to the system PATH permanently
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
if ($currentPath -notlike "*$pgPath*") {
    $newPath = "$pgPath;$currentPath"
    [System.Environment]::SetEnvironmentVariable("Path", $newPath, [System.EnvironmentVariableTarget]::Machine)
}

# Set other PostgreSQL environment variables persistently
[System.Environment]::SetEnvironmentVariable("PGDATA", $pgData, [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable("PGDATABASE", $pgDatabase, [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable("PGUSER", $pgUser, [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable("PGPORT", $pgPort, [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable("PGLOCALEDIR", $pgLocaleDir, [System.EnvironmentVariableTarget]::Machine)

Write-Output "PostgreSQL environment variables set successfully. Restart your system for changes to take effect."
