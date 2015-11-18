name := """GitAnalysis"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  "org.kohsuke" % "github-api" % "1.70"
)

resolvers += Resolver.typesafeRepo("releases")
resolvers += "Github-API" at "http://repo.jenkins-ci.org/public/"

EclipseKeys.preTasks := Seq(compile in Compile)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator
