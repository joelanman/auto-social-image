#! /bin/bash
convert -fill white \
        -background transparent \
        -font GDSTransportBold.ttf \
        -pointsize 72 \
        -size 1040x310 \
        -interline-spacing -10 \
        caption:'MMMMMMMMMMMMMMMMMMMMMM MMMMMMMMMMMMMMMMMMMMMMMMMMM MMMMMMMMMMMMMMMMMMMMMMM' \
        -gravity North \
        base.png \
        +swap \
        -geometry +0+80 \
        -composite \
        test.png
