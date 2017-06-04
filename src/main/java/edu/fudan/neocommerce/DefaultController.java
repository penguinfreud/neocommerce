package edu.fudan.neocommerce;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class DefaultController {
    private static final String indexHtml = "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "    <title>Neocommerce</title>\n" +
            "    <base href=\"/\">\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
            "\n" +
            "    <script src=\"shim.min.js\"></script>\n" +
            "    <script src=\"zone.js\"></script>\n" +
            "    <script src=\"assets/js/lib/three-r84.js\"></script>\n" +
            "    <script src=\"assets/js/lib/ColladaLoader.js\"></script>\n" +
            "    <script src=\"assets/js/lib/OrbitControls.js\"></script>\n" +
            "    <script src=\"assets/js/lib/stats.min.js\"></script>\n" +
            "    <script src=\"assets/js/product-detail.js\"></script>\n" +
            "</head>\n" +
            "\n" +
            "<body>\n" +
            "<neocommerce>Loading ...</neocommerce>\n" +
            "<script src=\"build.js\"></script>\n" +
            "</body>\n" +
            "</html>\n";

    @RequestMapping({"/", "/products", "/login", "/signup", "/balance", "/detail/**"})
    @ResponseBody
    public String defaultMapping() throws IOException {
        return indexHtml;
    }
}
