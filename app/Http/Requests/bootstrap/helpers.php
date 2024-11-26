<?php

use App\Helpers\ViewHelper;

if (! function_exists('publish_asset')) {
    /**
     * Append the asset modification timestamp as a query parameter to bust cache
     *
     * @param  string  $filePath
     */
    function publish_asset($filePath): string
    {
        return ViewHelper::publishAssetWithTimestamp($filePath);
    }
}
