<?php

declare(strict_types=1);

namespace App\Helpers;

class ViewHelper
{
    /**
     * Append the modification timestamp to the asset path as query parameter
     *
     * @param string $asset
     * @return string
     */
    public static function publishAssetWithTimestamp($asset): string
    {
        $timestamp = @filemtime(public_path($asset));

        if ($timestamp > 0) {
            return $asset . '?v=' . $timestamp;
        }

        return $asset;
    }
}
