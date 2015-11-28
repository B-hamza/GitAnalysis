import org.junit.*;

import controllers.SearchController;
import play.mvc.*;
import play.test.WithApplication;
import play.twirl.api.Content;
import static play.test.Helpers.*;
import static org.junit.Assert.*;


/**
*
* Simple (JUnit) tests that can call all parts of a play app.
* If you are interested in mocking a whole application, see the wiki for more details.
*
*/
public class SearchControllerTest extends WithApplication {

    
    @Test
    public void testSearchRoute() {
    	Result result = route(fakeRequest(GET,"/search/tetris"));
    	assertEquals(OK, result.status());
    	assertEquals("application/json", result.contentType());
    }
    
    @Test
    public void testGetCommitsRoute() {
    	Result result = route(fakeRequest(GET,"/repositories/29673610"));
    	assertEquals(OK, result.status());
    	assertEquals("application/json", result.contentType());
    }
    
    @Test
    public void testSearchByPromiseRoute() {
    	//SearchController.searchUsingPromise("tetris");
    	
    }

    @Test
    public void renderTemplate() {
        Content html = views.html.main.render("Git Api");
        assertEquals("text/html", contentType(html));
        assertTrue(contentAsString(html).contains("Git Api"));
    }


}
