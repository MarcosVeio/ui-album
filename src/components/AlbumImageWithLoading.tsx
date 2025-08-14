import React, { useState } from "react";
import Image from "next/image";
import { Box, CircularProgress } from "@mui/material";

interface AlbumImageWithLoadingProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
}

export function AlbumImageWithLoading({
  src,
  alt,
  width,
  height,
  onClick,
  style,
  sizes,
  priority = false,
}: AlbumImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);
  return (
    <Box
      position="relative"
      width={width}
      height={height}
      onClick={onClick}
      style={style}
    >
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width={width}
          height={height}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="#f5f5f5"
          zIndex={1}
        >
          <CircularProgress size={32} />
        </Box>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        sizes={sizes}
        priority={priority}
        onLoadingComplete={() => setLoading(false)}
      />
    </Box>
  );
}
